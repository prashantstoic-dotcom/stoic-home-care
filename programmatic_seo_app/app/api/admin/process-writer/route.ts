import { NextResponse } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/dist/nextjs";
import { createClient } from "@supabase/supabase-js";
import { buildAdvancedWriterPrompt, GEMINI_MODEL_CONFIG, ParagraphSchema, parseAndValidateParagraph, JsonLdSchema } from "@/lib/gemini";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { zodToJsonSchema } from "zod-to-json-schema";
import OpenAI from "openai";

// Initialize Supabase Admin Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy' // Bypass RLS for admin background route
);

// Initialize Gemini Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "mock-key-for-build");

// Initialize OpenAI Client for DALL-E
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "mock-key-for-build" });

// Part 5.4.1: Background Worker API scaffold
// The verifySignatureAppRouter wrapper is CRITICAL. It cryptographically guarantees 
// that ONLY Upstash QStash can trigger this route. It prevents DDoS and unauthorized AI billing.
async function handler(req: Request) {
  try {
    const body = await req.json();
    const { topicId } = body;

    if (!topicId) {
      return NextResponse.json({ error: "Missing topicId" }, { status: 400 });
    }

    // Part 5.4.2 - DB State Initialization
    // Fetch the topic and set status to processing_writer so the frontend shows a spinner
    const { data: topicData, error: topicError } = await supabase
      .from("content_gaps")
      .update({ status: "processing_writer" })
      .eq("id", topicId)
      .select()
      .single();

    if (topicError || !topicData) {
      throw new Error(`Failed to fetch or update topic: ${topicError?.message}`);
    }

    // Part 5.5.1 - Outline Iteration: Safely parsing the Tool 6 JSON array
    let outlineArray: any[] = [];
    try {
      if (typeof topicData.suggested_outline === 'string') {
        outlineArray = JSON.parse(topicData.suggested_outline);
      } else if (Array.isArray(topicData.suggested_outline)) {
        outlineArray = topicData.suggested_outline;
      } else {
        throw new Error("suggested_outline is neither a string nor an array.");
      }
    } catch (e: any) {
      throw new Error(`CRITICAL: Failed to parse outline JSON: ${e.message}`);
    }

    if (outlineArray.length === 0) {
      throw new Error("CRITICAL: Outline array is empty. Cannot generate article without headings.");
    }

    // We will store the final HTML pieces here
    const finalArticleBlocks: string[] = [];

    // Part 5.5.2 - Setting up the asynchronous chunking loop
    // We MUST use a for...of loop here, NEVER Promise.all or forEach.
    // This strictly processes one heading at a time to prevent LLM rate limits and OOM crashes.
    for (let i = 0; i < outlineArray.length; i++) {
      const headingObj = outlineArray[i];
      const headingText = headingObj.heading || headingObj.title || headingObj.section_title || String(headingObj);
      const lsiKeywords = headingObj.keywords || [];

      console.log(`[Chunking] Processing ${i + 1}/${outlineArray.length}: ${headingText}`);

      // Part 5.5.5a - RAG Data Fetcher (Tavily Live Search)
      let ragContext = "";
      try {
        console.log(`[Tavily] Fetching live data for: "${headingText}"`);
        const tvlyRes = await fetch("https://api.tavily.com/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: process.env.TAVILY_API_KEY,
            query: headingText,
            search_depth: "advanced",
            include_answer: true,
            max_results: 3
          }),
        });

        if (tvlyRes.ok) {
          const tvlyData = await tvlyRes.json();
          // Extract the AI generated summary plus snippets from top 3 pages.
          ragContext = `${tvlyData.answer || ''} \n\n ${(tvlyData.results || []).map((r: any) => r.content).join("\\n\\n")}`;
        } else {
          console.warn(`[Tavily] Search failed for "${headingText}". Continuing without RAG.`);
        }
      } catch (e: any) {
        console.warn(`[Tavily] Network error for "${headingText}". Continuing without RAG.`);
      }

      // Part 5.5.5b - RAG Data Fetcher (Text summarization / cleaning)
      // We must brutally trim the context to avoid Gemini Token Limit Exhaustion
      // and keep the generation speed fast (Zero-Lag principle).
      if (ragContext.length > 1500) {
        ragContext = ragContext.substring(0, 1500) + "... [Context Truncated for Token Limits]";
      }
      ragContext = ragContext.replace(/\s+/g, ' ').trim();

      // Part 5.6.1 - Gemini Execution: Dynamic Prompt Construction
      console.log(`[Prompt Builder] Compiling rules for: "${headingText}"`);
      const finalPrompt = buildAdvancedWriterPrompt(
        headingText,
        ragContext,
        lsiKeywords,
        "healthcare_services"
      );

      // Part 5.6.2 - Gemini Execution with Dynamic Blocks Zod Schema
      console.log(`[Gemini] Calling API for: "${headingText}"`);
      
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-pro",
        generationConfig: {
          ...GEMINI_MODEL_CONFIG,
          responseSchema: zodToJsonSchema(ParagraphSchema, "ParagraphSchema") as any,
        }
      });

      const result = await model.generateContent(finalPrompt);
      const rawJsonString = result.response.text();
      
      console.log(`[Gemini] Received response for: "${headingText}"`);

      // Part 5.6.5a - Critic Agent Validation (Safe Parsing and Self-Healing)
      const validationResult = parseAndValidateParagraph(rawJsonString);
      
      if (!validationResult.success || !validationResult.data) {
        // AI failed the strict rules (Lie detector, length constraints, or invalid JSON).
        console.error(`[Critic Agent] Validation failed for "${headingText}": `, validationResult.errors);
        
        // CRITICAL SELF-HEALING LOOP:
        // By throwing this error, the current Vercel execution fails.
        // QStash intercepts this 500 status and will AUTOMATICALLY retry this exact API call 
        // up to 3 times (as configured in Part 5.3.2) without user intervention.
        throw new Error(`Critic Agent rejected AI output. Reason: ${validationResult.errors}`);
      }

      console.log(`[Critic Agent] Validation PASSED for "${headingText}". Formatting is perfect.`);
      const validatedBlocks = validationResult.data.content_blocks;

      // Part 5.6.8a - Media Pipeline (DALL-E 3 Image Generation loop)
      for (let j = 0; j < validatedBlocks.length; j++) {
        const block = validatedBlocks[j];
        
        if (block.suggested_image_prompt && block.suggested_image_prompt.length > 20) {
          console.log(`[DALL-E] Generating image for block ${j+1}: "${block.suggested_image_prompt.substring(0, 30)}..."`);
          try {
            // Part 5.6.8b: Calling DALL-E 3 API
            const imageResponse = await openai.images.generate({
              model: "dall-e-3",
              prompt: block.suggested_image_prompt,
              n: 1,
              size: "1024x1024",
              response_format: "b64_json", 
            });

            const base64Image = imageResponse.data[0].b64_json;
            if (base64Image) {
              // Part 5.6.8c: Uploading raw image buffer to Supabase Storage
              const buffer = Buffer.from(base64Image, 'base64');
              const fileName = `${topicId}/${Date.now()}-block-${j}.png`;
              
              const { error: uploadError } = await supabase.storage
                .from('article_images')
                .upload(fileName, buffer, {
                  contentType: 'image/png',
                  cacheControl: '3600',
                  upsert: false
                });

              if (!uploadError) {
                const { data: publicUrlData } = supabase.storage
                  .from('article_images')
                  .getPublicUrl(fileName);

                const imageUrl = publicUrlData.publicUrl;
                console.log(`[Supabase] Image uploaded successfully: ${imageUrl}`);

                // Part 5.6.8d: HTML <img> tag injection with SEO alt-text
                const altText = lsiKeywords.length > 0 ? lsiKeywords[0] : "AI Generated Image";
                const imgTag = `
                  <figure class="my-8">
                    <img src="${imageUrl}" alt="${altText}" class="rounded-xl shadow-lg w-full object-cover max-h-[500px]" loading="lazy" />
                    <figcaption class="text-center text-sm text-gray-500 mt-2">Illustration based on: ${block.suggested_image_prompt.substring(0, 50)}...</figcaption>
                  </figure>
                `;
                block.html_content += imgTag;
              } else {
                console.error(`[Supabase] Image upload failed: ${uploadError.message}`);
              }
            }
          } catch (e: any) {
            console.error(`[DALL-E] Failed to generate image: ${e.message}. Continuing without image.`);
          }
        }
        
        // Part 5.7.1: HTML Assembly
        let blockHtml = block.html_content;

        if (block.block_type === 'table' && block.table_data) {
          const table = block.table_data;
          let thHtml = table.headers.map(h => `<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${h}</th>`).join('');
          let trHtml = table.rows.map(row => {
            const tdHtml = row.map(cell => `<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${cell}</td>`).join('');
            return `<tr class="bg-white border-b">${tdHtml}</tr>`;
          }).join('');
          
          blockHtml += `<div class="overflow-x-auto my-8"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr>${thHtml}</tr></thead><tbody class="bg-white divide-y divide-gray-200">${trHtml}</tbody></table></div>`;
        }

        if (block.block_type === 'faq' && block.faq_data) {
          let faqsHtml = block.faq_data.map(faq => `
            <details class="group border-b border-gray-200 py-4">
              <summary class="flex justify-between items-center font-medium cursor-pointer list-none text-lg text-gray-900">
                <span>${faq.question}</span>
                <span class="transition group-open:rotate-180">
                  <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p class="text-gray-600 mt-3 group-open:animate-fadeIn">${faq.answer}</p>
            </details>
          `).join('');
          blockHtml += `<div class="my-8 max-w-3xl mx-auto">${faqsHtml}</div>`;
        }

        finalArticleBlocks.push(`<section class="article-section my-6">${blockHtml}</section>`);
      }
    } // End of Chunking Loop

    let finalArticleHtml = finalArticleBlocks.join('\\n');

    // Part 5.8.1 - Autonomous Linking (Fetching slugs)
    console.log(`[Internal Linking] Fetching active slugs from DB...`);
    const { data: existingArticles, error: slugsError } = await supabase
      .from('published_articles')
      .select('title, slug')
      .order('created_at', { ascending: false })
      .limit(50); // Fetch top 50 recent articles to link to

    if (slugsError) {
      console.error(`[Internal Linking] Failed to fetch slugs: ${slugsError.message}`);
    }

    // We only trigger the AI Linking Agent if we actually have other articles on the site.
    if (existingArticles && existingArticles.length > 0) {
      const linkContext = existingArticles.map(a => `Title: "${a.title}", URL Slug: "${a.slug}"`).join("\\n");
      
      // Part 5.8.2 - Autonomous Linking (Gemini API Call for Injection)
      console.log(`[Internal Linking] Calling Gemini for natural anchor tag injection...`);
      try {
        const linkingPrompt = `
          You are an expert SEO internal linking agent.
          Below is a fully formatted HTML article.
          Below that is a list of existing published articles on our website.
          
          YOUR TASK:
          1. Read the HTML article.
          2. Find 3 to 5 NATURAL spots in the text (paragraphs only, DO NOT touch headers, tables, or existing links/images) where a mention of an existing article would make sense.
          3. Wrap the relevant exact words in an anchor tag pointing to the slug. 
             Example: <a href="/blog/the-slug-here" class="text-blue-600 underline">relevant text</a>
          4. DO NOT change ANY other HTML. DO NOT add markdown like \`\`\`html. Return ONLY the modified raw HTML string.
          
          EXISTING ARTICLES:
          ${linkContext}
          
          HTML ARTICLE:
          ${finalArticleHtml}
        `;

        const linkModel = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
        const linkResult = await linkModel.generateContent(linkingPrompt);
        
        let linkedHtml = linkResult.response.text();
        
        // Sanitize out markdown blocks if AI accidentally added them
        linkedHtml = linkedHtml.replace(/\`\`\`html/g, '').replace(/\`\`\`/g, '').trim();
        
        if (linkedHtml.length > 100) {
          finalArticleHtml = linkedHtml;
          console.log(`[Internal Linking] Successfully injected internal links.`);
        }
      } catch (e: any) {
        console.error(`[Internal Linking] Gemini failed to inject links: ${e.message}. Proceeding without internal links.`);
      }
      
    } else {
      console.log(`[Internal Linking] No existing articles found. Skipping link injection.`);
    }

    // Part 5.8.5b - Schema Gen: Gemini API call for JSON-LD
    console.log(`[Schema Gen] Generating JSON-LD schema for SEO...`);
    let generatedSchema = null;
    try {
      const schemaModel = genAI.getGenerativeModel({
        model: "gemini-1.5-flash", // Fast model is sufficient for data extraction
        generationConfig: {
          temperature: 0.1, // Very low temp for strict factual extraction
          responseMimeType: "application/json",
          responseSchema: zodToJsonSchema(JsonLdSchema, "JsonLdSchema") as any,
        }
      });

      const schemaPrompt = `
        Analyze the following HTML article.
        1. Create an 'Article' schema with a catchy headline and a 160-char SEO meta description.
        2. Set author name to "System Admin".
        3. Set datePublished to today's date (ISO 8601).
        4. If there are any FAQs (questions and answers) in the HTML, extract them exactly and put them in the faq_schema. If there are no FAQs, leave it empty.
        
        HTML CONTENT:
        ${finalArticleHtml}
      `;

      const schemaResult = await schemaModel.generateContent(schemaPrompt);
      generatedSchema = JSON.parse(schemaResult.response.text());
      console.log(`[Schema Gen] JSON-LD generated successfully.`);
    } catch (e: any) {
      console.error(`[Schema Gen] Failed to generate schema: ${e.message}. Proceeding without schema.`);
    }

    // Part 5.9.1 - Database Persistence: Insert into published_articles
    console.log(`[DB] Saving final article to database...`);
    const slug = topicData.topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    const { error: insertError } = await supabase
      .from('published_articles')
      .insert({
        title: topicData.topic,
        slug: slug,
        html_content: finalArticleHtml,
        json_ld_schema: generatedSchema,
        primary_keyword: topicData.topic,
        status: 'published' 
      });

    if (insertError) {
      throw new Error(`CRITICAL: Failed to save article to DB: ${insertError.message}`);
    }

    // Part 5.9.2 - Database Persistence: Finalize gap status
    const { error: updateError } = await supabase
      .from('content_gaps')
      .update({ status: 'published' })
      .eq('id', topicId);

    if (updateError) {
      console.warn(`[DB] Article saved, but failed to update content_gaps status: ${updateError.message}`);
    }

    console.log(`[Success] 🎉 Article generation complete for: ${topicData.topic}`);

    return NextResponse.json({ success: true, message: `Worker completed for ${topicId}` });

  } catch (error: any) {
    console.error("Worker Error:", error);
    // If we throw or return 500 here, QStash will AUTOMATICALLY intercept it and trigger the retry loop.
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Export the wrapped handler
// verifySignatureAppRouter reads QSTASH_CURRENT_SIGNING_KEY at module init;
// guard it so Next.js build doesn't crash when env vars are absent.
const hasQStashKeys =
  process.env.QSTASH_CURRENT_SIGNING_KEY && process.env.QSTASH_NEXT_SIGNING_KEY;

export const POST = hasQStashKeys
  ? verifySignatureAppRouter(handler)
  : (req: Request) => handler(req);

// Vercel Specific: Force this route to run in the background with maximum timeout
export const maxDuration = 300; // 5 minutes (Requires Vercel Pro, falls back to max allowed on free)
