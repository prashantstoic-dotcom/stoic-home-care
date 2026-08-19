import { GoogleGenAI } from '@google/genai';
import { z } from 'zod';

// Initialize the Gemini client
// Ensure GEMINI_API_KEY is set in your environment variables.
const geminiApiKey = process.env.GEMINI_API_KEY || 'dummy_key_for_dev';

export const geminiClient = new GoogleGenAI({
  apiKey: geminiApiKey,
});

// Define the Strict Zod Schema for Content Gap Extraction.
// This forces Gemini to respond EXACTLY in this JSON format, preventing parsing errors.
export const KeywordExtractionSchema = z.object({
  primaryEntities: z.array(
    z.string().describe("The core medical/service entities found in the text, e.g., 'Physiotherapy', 'ICU Setup'")
  ),
  lsiKeywords: z.array(
    z.string().describe("Related latent semantic indexing keywords and phrases")
  ),
  searchIntent: z.enum(["informational", "transactional", "navigational", "mixed"]).describe("The primary search intent of the competitor's page")
});

// Helper function snippet on how to pass the schema to the model (used later in Part 2.3)
export const geminiModelConfig = {
  model: 'gemini-2.5-flash', // Flash is faster and cheaper for bulk text processing
  config: {
    responseMimeType: 'application/json',
    // We will pass the parsed Zod schema here dynamically when calling the API
  }
};

// Define the Strict Zod Schema for Outline Generation (Part 3.4)
// This forces Gemini to output a rigid structure for Tool 7 (Writer) to consume.
export const OutlineSchema = z.object({
  outline: z.array(z.object({
    type: z.enum(["h2", "h3"]).describe("The heading level"),
    text: z.string().describe("The actual heading text"),
    keywordsToInclude: z.array(z.string()).describe("List of missing entities/LSI keywords that the writer MUST include in the paragraph under this heading")
});

// ============================================================================
// Tool 7: AI Writer Configurations (Phase A: Deep Prompt Engineering)
// ============================================================================

// Part 5.1.2: Tone & Voice Constraint Matrix
// This matrix strictly defines the psychological tone of the AI agent based on the niche.
export const TONE_MATRIX = {
  healthcare_services: `
    - EMPATHY: High. Acknowledge the reader's pain or anxiety before providing solutions.
    - AUTHORITY: Clinical but accessible. Speak as an experienced practitioner. Avoid words like 'maybe' or 'might'.
    - PERSPECTIVE: Speak directly to the reader as "You". Refer to yourself/clinic as "We" or "Our".
    - NUANCE: Reassuring, structured, and factual. Never sound overly salesy or aggressive.
  `,
  finance: `
    - EMPATHY: Moderate. Focus on financial security and reducing stress.
    - AUTHORITY: Highly analytical and objective. Use data-driven confidence.
    - PERSPECTIVE: Speak directly to the reader as "You".
    - NUANCE: Trustworthy and cautious. Avoid promising guaranteed returns.
  `
};

// Part 5.1.3: Burstiness & Perplexity Algorithms
// Mathematically forces the AI to break predictable sentence length patterns to bypass AI detectors.
export const BURSTINESS_RULES = `
  - SENTENCE VARIATION (BURSTINESS): You must artificially inject burstiness. 
    Rule 1: Never write more than two sentences of the same length in a row.
    Rule 2: Follow a long explanatory sentence (15-20 words) immediately with an extremely short punchy sentence (2-5 words). 
    Example: "This treatment significantly reduces inflammation in the lower back muscles. It works fast. You will feel the difference."
  - PERPLEXITY (UNPREDICTABILITY): Avoid algorithmic phrasing. Use rare but natural synonyms.
`;

// Part 5.1.4: Negative Constraint Logic
// Blacklists common ChatGPT/AI phrases that trigger AI detection tools.
export const BANNED_AI_WORDS = [
  "delve", "tapestry", "moreover", "crucial", "seamless", "landscape", 
  "in conclusion", "in this fast-paced world", "it is important to note",
  "robust", "demystify", "embark", "testament"
];

export const NEGATIVE_CONSTRAINTS = `
  - BANNED VOCABULARY (STRICT): You will be severely penalized if you use ANY of the following words or phrases:
    ${BANNED_AI_WORDS.map(word => `"${word}"`).join(', ')}.
    Do NOT use fluff, filler, or robotic transitions.
`;

// Part 5.1.5: Readability Scoring Rules
// Ensures the content is easily digestible, increasing Dwell Time for SEO.
export const READABILITY_RULES = `
  - READABILITY (Flesch-Kincaid 8th Grade Level): 
    Rule 1: Keep language incredibly simple. Write as if you are explaining the concept to a 14-year-old.
    Rule 2: Avoid complex, multi-syllable jargon unless strictly necessary. If you use jargon, explain it immediately in plain English.
    Rule 3: Keep paragraphs extremely short (maximum 3-4 sentences per paragraph) to ensure the text is easily scannable on mobile devices.
`;

// Part 5.1.6: Formatting & Syntax Rules
// Enforces pure HTML output to avoid heavy client-side markdown parsing (Zero-Lag policy).
export const FORMATTING_RULES = `
  - FORMATTING & SYNTAX (STRICT HTML ONLY):
    Rule 1: NEVER use Markdown formatting (e.g., **bold**, *italics*, \`code\`). 
    Rule 2: Use ONLY valid, semantic HTML tags (e.g., <p>, <strong>, <em>, <ul>, <li>).
    Rule 3: Do NOT wrap the entire output in a single parent <div> or return a full HTML document (no <html>, <head>, or <body> tags). Only return the raw HTML blocks.
    Rule 4: Do NOT use markdown code blocks (\`\`\`html) around your response. Just return the raw string.
`;

// Part 5.1.7: Keyword Density & Semantic Injection Logic
// Prevents Google penalty for Keyword Stuffing and enforces LSI natural distribution.
export const SEO_INJECTION_RULES = `
  - SEO & KEYWORD DENSITY (NATURAL INJECTION):
    Rule 1: NEVER engage in keyword stuffing. Do not force keywords into sentences where they do not naturally belong.
    Rule 2: Semantic Variation: Use LSI (Latent Semantic Indexing) equivalents. Use natural variations of the main topic rather than exact repetitions.
    Rule 3: Contextual Relevance: The keywords must serve the reader's intent. If providing a required keyword makes the sentence sound robotic, rewrite the sentence to accommodate it naturally.
`;

// Part 5.1.8: Psychological Triggers
// Upgrades the AI from an information bot to a persuasive copywriter.
export const PSYCHOLOGICAL_TRIGGERS = `
  - PSYCHOLOGICAL TRIGGERS & COPYWRITING:
    Rule 1: The Hook: Start the first paragraph of any major section with a strong hook—a surprising fact, a relatable question, or a bold statement.
    Rule 2: Empathy First: Before presenting a solution or technical detail, briefly validate the reader's problem or frustration.
    Rule 3: FOMO & Action: When concluding a thought, subtly imply the cost of inaction or the immediate benefit of taking action.
`;

// Part 5.1.9: Transition & Flow Rules
// Eliminates robotic transitions like "Firstly" and replaces them with conversational Bucket Brigades.
export const TRANSITION_RULES = `
  - TRANSITIONS & FLOW (INVISIBLE BRIDGES):
    Rule 1: NO ROBOTIC TRANSITIONS. Never use words like "Firstly", "Secondly", "Furthermore", "In addition", "Therefore", or "Moreover" to start a paragraph.
    Rule 2: The 'Bucket Brigade' technique: Use conversational bridges (e.g., "Here's the truth:", "But wait, it gets better.", "Think about it for a second.") to connect disparate thoughts and keep the reader scrolling.
    Rule 3: Carry the core idea of the previous sentence into the subject of the next sentence, making the text flow like water.
`;

// Part 5.1.10: Dynamic Prompt Compiler Engine
// Stitches all the above rules, RAG context, and dynamic variables into a single Mega-Prompt.
export function buildAdvancedWriterPrompt(
  heading: string, 
  ragContext: string, 
  keywords: string[], 
  niche: keyof typeof TONE_MATRIX = 'healthcare_services'
): string {
  const tone = TONE_MATRIX[niche] || TONE_MATRIX.healthcare_services;
  
  return `
    You are an elite, world-class copywriter with 10 years of experience.
    Your task is to write a highly engaging, SEO-optimized section for the following heading:
    HEADING: "${heading}"

    REAL-TIME CONTEXT (Use this for factual accuracy, do not mention "According to the context"):
    ${ragContext}

    REQUIRED LSI KEYWORDS (Inject naturally, do not stuff):
    ${keywords.length > 0 ? keywords.join(', ') : 'None specified.'}

    === THE 8 COMMANDMENTS OF YOUR WRITING ===
    
    1. TONE & VOICE:
    ${tone}

    2. BURSTINESS & PERPLEXITY:
    ${BURSTINESS_RULES}

    3. NEGATIVE CONSTRAINTS:
    ${NEGATIVE_CONSTRAINTS}

    4. READABILITY:
    ${READABILITY_RULES}

    5. FORMATTING & SYNTAX:
    ${FORMATTING_RULES}

    6. SEO INJECTION:
    ${SEO_INJECTION_RULES}

    7. PSYCHOLOGY:
    ${PSYCHOLOGICAL_TRIGGERS}

    8. TRANSITIONS:
    ${TRANSITION_RULES}

    Strictly return your response formatted matching the Zod schema provided.
  `;
}

// Part 5.2.2 & 5.2.8: Strict Enum Definitions with Custom Errors
export const BlockTypeEnum = z.enum(["paragraph", "table", "bullet_list", "faq", "quote"], {
  errorMap: () => ({ message: "CRITICAL: Invalid block type. You must ONLY use 'paragraph', 'table', 'bullet_list', 'faq', or 'quote'." })
});

// Part 5.2.3: HTML String Validation Rules (Regex refining)
const htmlValidator = z.string({
  required_error: "CRITICAL: html_content is required.",
  invalid_type_error: "CRITICAL: html_content must be a string."
})
  .describe("The formatted HTML for this specific block type (NO markdown wrappers)")
  .refine((val) => !val.includes("<script"), {
    message: "CRITICAL: HTML must not contain <script> tags."
  })
  .refine((val) => !val.includes("\`\`\`"), {
    message: "CRITICAL: HTML must not contain markdown code block formatting (```)."
  })
  .refine((val) => !val.includes("<html") && !val.includes("<body"), {
    message: "CRITICAL: Return only HTML fragments, not a full HTML document."
  });

// Part 5.2.4: Table Structure Sub-Schema
const TableDataSchema = z.object({
  headers: z.array(z.string()).describe("Column headers for the table"),
  rows: z.array(z.array(z.string())).describe("Rows containing the cell data matching the headers")
}).nullable().optional().describe("Provide this strictly formatted JSON array IF AND ONLY IF type is 'table'. Otherwise null.");

// Part 5.2.5: FAQ Structure Sub-Schema
const FaqDataSchema = z.array(
  z.object({
    question: z.string().describe("The frequently asked question"),
    answer: z.string().describe("The concise, direct answer to the question")
  })
).nullable().optional().describe("Provide this strictly formatted JSON array IF AND ONLY IF type is 'faq'. Otherwise null.");

// Part 5.2.7: DALL-E Image Prompt Rules
const imagePromptValidator = z.string()
  .min(30, "CRITICAL: Image prompt is too short. It must be a highly detailed description (minimum 30 characters) including lighting, style, and camera angles.")
  .refine((val) => val.toLowerCase().includes("style") || val.toLowerCase().includes("lighting") || val.toLowerCase().includes("photography") || val.toLowerCase().includes("cinematic"), {
    message: "CRITICAL: Image prompt must specify a 'style' (e.g., photorealistic, illustration) or 'lighting'."
  })
  .nullable()
  .describe("A highly detailed DALL-E/Midjourney prompt if an image would explain this block well. Must include style/lighting. Otherwise null.");

// Part 5.2.1 & 5.2.6 & 5.2.8: Advanced Zod Schema for Blog Paragraphs (Dynamic Blocks)
// Forces Gemini to decide the best format (text, table, faq) and provide image prompts
export const ParagraphSchema = z.object({
  heading_text: z.string({
    required_error: "CRITICAL: heading_text is required. You must specify which heading you are writing for.",
    invalid_type_error: "CRITICAL: heading_text must be a string."
  }).min(3, "CRITICAL: heading_text is too short.").describe("The heading this content belongs to"),
  content_blocks: z.array(
    z.object({
      type: BlockTypeEnum,
      html_content: htmlValidator,
      table_data: TableDataSchema,
      faq_data: FaqDataSchema,
      lsi_keywords_used: z.array(z.string()).describe("List of semantic/LSI keywords naturally included in this block"),
      suggested_image_prompt: imagePromptValidator
    }).superRefine((data, ctx) => {
      // Part 5.2.6: LSI Keyword Matcher (Lie Detector)
      if (data.lsi_keywords_used.length > 0 && data.html_content) {
        const textLower = data.html_content.toLowerCase();
        for (const kw of data.lsi_keywords_used) {
          if (!textLower.includes(kw.toLowerCase())) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: \`CRITICAL: You claimed to use the keyword "\${kw}", but it is missing from the html_content. Do not lie.\`,
            });
          }
        }
      }
    })
  ).min(1, "CRITICAL: You must return at least one content block.")
});

// Part 5.2.10: TypeScript Type Exports
// Generates strict TypeScript types directly from the Zod schema for app-wide use.
export type ParagraphData = z.infer<typeof ParagraphSchema>;
export type ContentBlock = ParagraphData["content_blocks"][number];
export type BlockType = z.infer<typeof BlockTypeEnum>;
export type TableData = NonNullable<ContentBlock["table_data"]>;
export type FaqData = NonNullable<ContentBlock["faq_data"]>;

// Part 5.2.9: Safe Parse & Sanitization Wrapper
export function parseAndValidateParagraph(jsonString: string) {
  try {
    // 1. First attempt to parse the raw string into JSON
    const parsedJson = JSON.parse(jsonString);
    
    // 2. Safely validate against our strict Zod schema
    const validation = ParagraphSchema.safeParse(parsedJson);
    
    if (validation.success) {
      return { success: true, data: validation.data, errors: null };
    } else {
      // Extract the highly specific custom error messages we wrote in Part 5.2.8
      const errorMessages = validation.error.errors.map(err => err.message).join(" | ");
      return { success: false, data: null, errors: errorMessages };
    }
  } catch (error: any) {
    // Catch generic JSON parsing errors (e.g., missing comma)
    return { success: false, data: null, errors: \`CRITICAL: Invalid JSON structure. Failed to parse string. Details: \${error.message}\` };
  }
}

// Part 5.2.11: Model Tuning Guardrails
// Optimized for SEO Copywriting: Balances creativity (for hooks) with strict factual adherence (for LSI).
export const GEMINI_MODEL_CONFIG = {
  temperature: 0.6, // Not too robotic (0.1), not too chaotic (1.0). Sweet spot for copywriting.
  topP: 0.8,        // Focuses the model on high-probability vocabulary, reducing hallucinated words.
  topK: 40,         // Limits the word choices to the top 40 most likely next words.
  maxOutputTokens: 2500, // Enough for a very detailed section with table/faq, but prevents infinite loops.
  responseMimeType: "application/json" // Forces Gemini to adhere to our Zod schema structure.
};

// Part 5.8.5a: Strict JSON-LD Schema for Rich Snippets
export const JsonLdSchema = z.object({
  article_schema: z.object({
    "@context": z.literal("https://schema.org"),
    "@type": z.literal("Article"),
    headline: z.string().describe("The main title of the article."),
    description: z.string().describe("A 160-character SEO meta description summarizing the article."),
    author: z.object({
      "@type": z.literal("Person"),
      name: z.string()
    }),
    datePublished: z.string().describe("ISO 8601 format date string."),
  }),
  faq_schema: z.object({
    "@context": z.literal("https://schema.org"),
    "@type": z.literal("FAQPage"),
    mainEntity: z.array(
      z.object({
        "@type": z.literal("Question"),
        name: z.string(),
        acceptedAnswer: z.object({
          "@type": z.literal("Answer"),
          text: z.string()
        })
      })
    ).describe("Extract all FAQs from the HTML and put them here. If none exist in the HTML, return an empty array.")
  }).optional()
});

// Part 8.2.5: AI Triage Schema for PR Engine
export const TriageResponseSchema = z.object({
  evaluations: z.array(z.object({
    id: z.string().describe("The ID of the external opportunity"),
    relevance_score: z.number().min(0).max(100).describe("Score from 0 to 100 based on relevance to Home Care and Senior Health."),
    reason: z.string().describe("1 sentence explaining why this score was given.")
  }))
});

// Part 8.3.3 & 8.3.4: Deep Prompt Engineering for PR Pitch (Subject & Body)
export function buildPRPitchPrompt(
  journalistQuery: string,
  ragContext: string,
  senderName: string,
  senderTitle: string,
  senderBio: string
): string {
  return \`
    You are an elite, highly-paid PR Manager representing \${senderName}, who is the \${senderTitle}.
    Your task is to write a pitch email answering a journalist's query.

    JOURNALIST'S QUERY:
    "\${journalistQuery}"

    SENDER'S INTERNAL EXPERT KNOWLEDGE (Use this to answer the query):
    "\${ragContext}"

    SENDER BIO (Context for why they are an expert):
    "\${senderBio}"

    === THE 5 COMMANDMENTS OF YOUR PITCH ===
    
    1. THE SUBJECT LINE (CRITICAL):
    - Must be under 8 words.
    - NEVER use clickbait.
    - Format example: "Expert quote: [Topic]" or "Source for your article on [Topic]".

    2. THE OPENING (NO BS):
    - NEVER start with "I hope this finds you well", "My name is", or "I saw you are looking for".
    - Start directly with the value. Example: "Regarding your query on [Topic], here is an expert perspective..."

    3. THE BODY (SHORT & PUNCHY):
    - The entire email body MUST NOT exceed 150 words.
    - Use the INTERNAL EXPERT KNOWLEDGE to provide a direct, insightful quote that the journalist can copy-paste.
    - Use bullet points if making multiple points.
    
    4. THE SIGN-OFF (AUTHORITATIVE):
    - End with a one-line call to action. Example: "Let me know if you need more details or a quick interview."
    - Sign off smoothly with the Sender's Name and Title.

    5. BANNED WORDS (IMMEDIATE FAILURE):
    - "delve", "tapestry", "moreover", "crucial", "seamless", "dear sir/madam", "greetings".

    Return your output strictly matching the provided JSON schema.
  \`;
}

// Part 8.3.5: Strict Zod Schema for Pitch object
export const PRPitchSchema = z.object({
  subject_line: z.string().describe("The email subject line, under 8 words."),
  pitch_body: z.string().describe("The exact HTML or plain text body of the email. Do not include subject here."),
  suggested_sender_email: z.string().email().describe("The email address to send from, usually extracted from the Persona context.")
});

// Tool 9 - Part 9.4.3 & 9.4.4: SEO Healer Prompt Builder
export function buildSEOHealerContentPrompt(
  targetKeyword: string, 
  originalContent: string, 
  missingTopics: string[],
  originalTitle: string
): string {
  return `
You are a world-class Technical SEO Editor. Your goal is to "Heal" a decaying blog post. 
The post has started losing Google rankings because competitors are covering topics we missed and taking our clicks.

TARGET KEYWORD: "${targetKeyword}"
ORIGINAL TITLE: "${originalTitle}"

ORIGINAL CONTENT:
---
${originalContent}
---

MISSING TOPICS GAPS (Identified from Top 5 Competitors):
- ${missingTopics.join('\n- ')}

STRICT CONTENT INSTRUCTIONS:
1. Rewrite the ORIGINAL CONTENT by naturally injecting the MISSING TOPICS.
2. Add new H2 or H3 sections where appropriate to cover these missing topics thoroughly.
3. DO NOT change the core tone, formatting style, or delete valuable original information. You are strictly expanding and upgrading it.
4. Output the healed content in standard Markdown format.

STRICT META & CTR INSTRUCTIONS:
5. Optimize the ORIGINAL TITLE to create a highly compelling, click-worthy H1 title.
6. The new title MUST include the TARGET KEYWORD. It should be catchy but NEVER fake or clickbait.
7. Write a new, punchy Meta Description (under 160 characters) designed to steal clicks from competitors on the search engine results page.
  `.trim();
}

// Tool 9 - Part 9.4.5: Strict Zod Schema for SEO Healer Output
export const SEOHealSchema = z.object({
  optimized_title: z.string().describe(
    "A slightly tweaked version of the original title, optimized for a higher CTR based on the target keyword."
  ),
  optimized_meta_description: z.string().max(160).describe(
    "A compelling meta description under 160 characters designed to steal clicks from competitors."
  ),
  healed_content: z.string().describe(
    "The full Markdown content of the article. It MUST include the original content AND naturally inject new headings/paragraphs covering the missing topics."
  ),
  added_headings: z.array(z.string()).describe(
    "List of the specific new H2/H3 headings you injected into the content to cover the gaps."
  )
});

export type SEOHealedArticle = z.infer<typeof SEOHealSchema>;


// ==========================================
// TOOL 10: OMNICHANNEL CONTENT MULTIPLIER
// ==========================================

// Part 10.2.1: Zod Schema for the Hook Extractor
export const SocialHooksSchema = z.object({
  core_insights: z.array(z.string().max(250)).length(3).describe(
    "Exactly 3 highly engaging, punchy insights extracted from the article. Each must be under 250 characters and read like a surprising fact, a contrarian opinion, or a highly valuable tip."
  )
});

// Part 10.2.1: Prompt Builder for Hook Extraction
export function buildHookExtractorPrompt(
  blogTitle: string, 
  blogContent: string
): string {
  return `nYou are a world-class Social Media Copywriter and Ghostwriter.
I am giving you a long-form SEO blog post. Your job is to extract the absolute best "meat" from it.

ARTICLE TITLE: ""
ARTICLE CONTENT:
---

---

STRICT INSTRUCTIONS:
1. Do NOT summarize the article. Summaries are boring on social media.
2. Find the 3 most interesting, surprising, or highly actionable insights from the text.
3. Rewrite these 3 insights as punchy, stand-alone statements (Hooks).
4. Each hook should make the reader stop scrolling and think, "Wow, I need to know more about this."
5. Return exactly 3 insights in the provided JSON format.
  .trim();
}


// Part 10.2.2: Prompt Builder for Twitter Thread
export function buildTwitterThreadPrompt(
  blogTitle: string,
  blogContent: string,
  coreHooks: string[]
): string {
  return `nYou are a top-tier Tech and Health Twitter (X) Ghostwriter known for writing viral threads.
Your task is to write a highly engaging 5-part Twitter Thread based on the provided blog post.

CORE HOOKS (Use the best one for the opening tweet):
- 

ARTICLE TITLE: ""
ARTICLE CONTENT (Context):
---

---

STRICT INSTRUCTIONS FOR THE THREAD:
1. TWEET 1 (The Hook): Must grab attention immediately. Use one of the CORE HOOKS. No hashtags.
2. TWEET 2, 3, 4 (The Body): Break down the most valuable insights from the article. Use formatting like bullet points or short punchy sentences. Keep it highly readable.
3. TWEET 5 (The Call to Action): Conclude the thread smoothly and tell them to read the full guide. End exactly with this placeholder for the link: [LINK]
4. TONE: Authoritative, punchy, no fluff. Do not use cringe corporate speak.
5. LENGTH: Each tweet MUST be under 280 characters.
6. Return the result strictly as a JSON array of 5 strings (one for each tweet).
  .trim();
}


// Part 10.2.3: Strict Zod Schema for Twitter Thread chunks
export const TwitterThreadSchema = z.object({
  thread: z.array(
    z.string()
     .max(280, "CRITICAL: A single tweet cannot exceed 280 characters. You must shorten this.")
     .describe("A single tweet in the 5-part thread.")
  )
  .length(5, "CRITICAL: The thread must contain exactly 5 tweets.")
  .describe("The array containing the 5 tweets for the thread.")
});

export type TwitterThreadData = z.infer<typeof TwitterThreadSchema>;


// Part 10.2.4: Zod Schema for LinkedIn Post
export const LinkedInPostSchema = z.object({
  post: z.string().describe("The full LinkedIn post text. Must include line breaks (\\n) for formatting.")
});

export type LinkedInPostData = z.infer<typeof LinkedInPostSchema>;

// Part 10.2.4: Prompt Builder for LinkedIn
export function buildLinkedInPostPrompt(
  blogTitle: string,
  blogContent: string,
  coreHooks: string[]
): string {
  return `nYou are a Top Voice on LinkedIn. You write professional, highly engaging, and story-driven B2B posts.
Your task is to write a single, long-form LinkedIn post based on the provided blog post.

CORE HOOKS (Use the best one for the opening sentence):
- 

ARTICLE TITLE: ""
ARTICLE CONTENT (Context):
---

---

STRICT INSTRUCTIONS FOR LINKEDIN:
1. THE HOOK: Start with a powerful, single-sentence statement that makes professionals stop scrolling. Use one of the CORE HOOKS.
2. THE STORY/PROBLEM: Write a short, relatable problem statement or story leading into the solution. Use extremely short paragraphs (1-2 sentences max).
3. THE VALUE: Use a bulleted list to share the top 3-4 insights from the article.
4. THE FORMATTING: Use generous line breaks (\\\\n\\\\n) between paragraphs. No dense walls of text.
5. THE CALL TO ACTION: End the post by asking a thought-provoking question, followed by exactly this placeholder for the full article link: [LINK]
6. TONE: Professional, authoritative, but conversational. No cringe jargon. No hashtags.
7. Return the result strictly in the provided JSON format.
  .trim();
}


// Part 10.2.6: Zod Schema for Email Newsletter
export const EmailNewsletterSchema = z.object({
  subject_line: z.string().describe("A highly clickable, curiosity-driven subject line (max 60 characters)."),
  email_body: z.string().describe("A short, punchy email body ending with a cliffhanger to click the link.")
});

export type EmailNewsletterData = z.infer<typeof EmailNewsletterSchema>;

// Part 10.2.6: Prompt Builder for Email
export function buildEmailNewsletterPrompt(
  blogTitle: string,
  blogContent: string,
  coreHooks: string[]
): string {
  return `
You are a world-class Email Copywriter (like the Morning Brew team).
Your task is to write a short, highly-clickable email newsletter promoting this new blog post.

CORE HOOKS (Use the best one to create curiosity):
- ${coreHooks.join('\n- ')}

ARTICLE TITLE: "${blogTitle}"
ARTICLE CONTENT (Context):
---
${blogContent}
---

STRICT INSTRUCTIONS FOR EMAIL:
1. SUBJECT LINE: Must be short, curiosity-driven, and NOT sound like spam or sales. Treat it like a personal email to a friend.
2. EMAIL BODY: 
   - Start with a quick personalized greeting (e.g., "Hi [Name],").
   - Introduce a fascinating concept or problem from the article.
   - Build suspense but DO NOT reveal the full solution.
   - Tell them the answer is in the new article.
   - Give them exactly this call to action link placeholder: [LINK]
3. TONE: Friendly, punchy, conversational, and slightly informal.
4. Return the result strictly in the provided JSON format.
  `.trim();
}

// Part 10.2.5 & 10.2.6: AI Execution Master Function
export async function generateOmnichannelContent(blogTitle: string, blogContent: string) {
  console.log("[Omnichannel] Step 1: Extracting Core Hooks...");
  
  // 1. Extract Hooks
  const hooksPrompt = buildHookExtractorPrompt(blogTitle, blogContent);
  const hooksResult = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: hooksPrompt }] }],
    generationConfig: {
      responseMimeType: "application/json"
    }
  });
  
  const hooksRaw = hooksResult.response.text();
  const hooksParsed = JSON.parse(hooksRaw); 
  const coreHooks = hooksParsed.core_insights || [];

  if (coreHooks.length === 0) {
    throw new Error("Failed to extract hooks from the article.");
  }

  console.log("[Omnichannel] Step 2: Generating Twitter, LinkedIn & Email content in parallel...");
  
  // 2. Generate Content for Platforms in Parallel for "Zero-Lag" performance
  const twitterPrompt = buildTwitterThreadPrompt(blogTitle, blogContent, coreHooks);
  const linkedinPrompt = buildLinkedInPostPrompt(blogTitle, blogContent, coreHooks);
  const emailPrompt = buildEmailNewsletterPrompt(blogTitle, blogContent, coreHooks);

  const [twitterRes, linkedinRes, emailRes] = await Promise.all([
    model.generateContent({
      contents: [{ role: "user", parts: [{ text: twitterPrompt }] }],
      generationConfig: { responseMimeType: "application/json" }
    }),
    model.generateContent({
      contents: [{ role: "user", parts: [{ text: linkedinPrompt }] }],
      generationConfig: { responseMimeType: "application/json" }
    }),
    model.generateContent({
      contents: [{ role: "user", parts: [{ text: emailPrompt }] }],
      generationConfig: { responseMimeType: "application/json" }
    })
  ]);

  const twitterRaw = JSON.parse(twitterRes.response.text());
  const linkedinRaw = JSON.parse(linkedinRes.response.text());
  const emailRaw = JSON.parse(emailRes.response.text());
  
  return {
    hooks: coreHooks,
    twitterThread: twitterRaw.thread, // Array of 5 strings
    linkedinPost: linkedinRaw.post,    // Single string
    emailNewsletter: emailRaw         // Object with subject_line and email_body
  };
}


// Part 10.3.2: Zod Schema for Visual Prompt
export const VisualPromptSchema = z.object({
  image_prompt: z.string().describe("A highly detailed text-to-image prompt (max 50 words) describing the visual scene.")
});

export type VisualPromptData = z.infer<typeof VisualPromptSchema>;

// Part 10.3.2: Prompt Builder for Visual Prompt
export function buildVisualPromptGenerator(blogTitle: string): string {
  return `nYou are an expert AI Image Prompt Engineer (Midjourney/Flux style).
Your task is to take a blog post title and convert it into a highly aesthetic, cinematic image generation prompt.

BLOG TITLE: ""

STRICT INSTRUCTIONS:
1. Do NOT include text, words, or letters in the image prompt (AI struggles with spelling).
2. Focus on the mood, lighting, colors, and subject matter.
3. Examples of style keywords: "cinematic lighting, minimalist, 3D render, vibrant, studio lighting, hyper-realistic, dark mode, neon accents".
4. Keep it under 50 words.
5. Return exactly the image prompt string in the provided JSON format.
  .trim();
}

