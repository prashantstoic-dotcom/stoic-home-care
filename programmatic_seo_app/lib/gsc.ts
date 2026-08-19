import { google } from 'googleapis';

export function getGSCAuth() {
  const base64Key = process.env.GCP_GSC_SERVICE_ACCOUNT_BASE64;
  
  if (!base64Key) {
    throw new Error("GCP_GSC_SERVICE_ACCOUNT_BASE64 is missing in environment variables. Please add the base64 encoded GCP service account JSON.");
  }

  let credentials;
  try {
    credentials = JSON.parse(Buffer.from(base64Key, 'base64').toString('utf-8'));
  } catch (error) {
    throw new Error("Failed to parse GCP_GSC_SERVICE_ACCOUNT_BASE64. Make sure it is a valid base64 encoded JSON string.");
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  return google.webmasters({
    version: 'v3',
    auth: auth,
  });
}
