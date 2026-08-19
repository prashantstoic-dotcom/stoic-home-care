import { BigQuery } from '@google-cloud/bigquery';

/**
 * Initializes the BigQuery Client
 * Requires GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY in .env
 */
export function getBigQueryClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const projectId = process.env.GOOGLE_PROJECT_ID;

  if (!clientEmail || !privateKey || !projectId) {
    throw new Error('BigQuery environment variables are missing');
  }

  return new BigQuery({
    projectId: projectId,
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    }
  });
}

