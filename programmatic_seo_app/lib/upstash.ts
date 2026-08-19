import { Client } from "@upstash/qstash";

// Initialize QStash client.
// We expect QSTASH_TOKEN to be present in environment variables.
// If it's missing during build/dev, we provide a dummy token to prevent crashing,
// but jobs will only succeed if a real token is provided in production/env.
const qstashToken = process.env.QSTASH_TOKEN || "dummy_token_replace_in_env";

export const qstashClient = new Client({
  token: qstashToken,
});
