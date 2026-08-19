import { NextResponse } from "next/server";
import { z } from "zod";
import { Client } from "@upstash/qstash";

// Initialize QStash Client
const qstashClient = new Client({ token: process.env.QSTASH_TOKEN || "mock-token-for-build" });

// Part 5.3.1: Strict input validation for the trigger
const TriggerSchema = z.object({
  topicId: z.string().uuid("CRITICAL: topicId must be a valid UUID."),
});

export async function POST(req: Request) {
  try {
    // 1. Basic Security: Check for a secret Admin API Key
    const authHeader = req.headers.get("authorization");
    if (authHeader !== \`Bearer \${process.env.ADMIN_API_SECRET}\`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse request body
    const body = await req.json();
    const parsed = TriggerSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    const { topicId } = parsed.data;

    // Part 5.3.2 - Initialize QStash client and dispatch job
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const destinationUrl = \`\${baseUrl}/api/admin/process-writer\`;

    const publishResponse = await qstashClient.publishJSON({
      url: destinationUrl,
      body: { topicId },
      retries: 3, // CRITICAL: Auto-retry up to 3 times if AI generation fails validation.
    });
    
    return NextResponse.json({ 
      success: true, 
      message: \`Job triggered successfully for topic: \${topicId}\`,
      messageId: publishResponse.messageId
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
