// Part 8.1.5: TypeScript Interfaces for Digital PR Engine

export type PROpportunityStatus = 'new' | 'drafting' | 'pitched' | 'rejected' | 'expired';

export interface PROpportunity {
  id: string;
  source: string;
  query_text: string;
  journalist_name?: string | null;
  media_outlet?: string | null;
  domain_authority: number;
  deadline?: string | null;
  relevance_score: number;
  status: PROpportunityStatus;
  created_at: string;
  updated_at: string;
}

export type PRPitchStatus = 'draft' | 'pending_review' | 'approved' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'won' | 'rejected';

export interface PRPitch {
  id: string;
  opportunity_id: string;
  subject_line: string;
  pitch_body: string;
  suggested_sender_email?: string | null;
  status: PRPitchStatus;
  email_message_id?: string | null;
  sent_at?: string | null;
  created_at: string;
  updated_at: string;
  
  // For UI convenience when joining tables
  opportunity?: PROpportunity;
}

export interface PRSettings {
  id: string;
  sender_name: string;
  sender_email: string;
  sender_title: string;
  sender_bio?: string | null;
  auto_pilot_enabled: boolean;
  min_relevance_to_send: number;
  created_at: string;
  updated_at: string;
}
