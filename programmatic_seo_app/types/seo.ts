export interface SEOPage {
  id: string;
  url: string;
  target_keyword: string;
  baseline_clicks: number;
  baseline_position: number;
  last_checked_at: string | null;
  status: 'tracking' | 'decaying' | 'healed';
}

export interface SEODecayLog {
  id: string;
  page_id: string;
  position_drop: number;
  ctr_drop_percentage: number;
  detected_at: string;
  status: 'needs_healing' | 'healing_in_progress' | 'healed';
}

export interface SERPSnapshot {
  id: string;
  decay_log_id: string;
  target_keyword: string;
  competitor_urls: string[];
  extracted_headings: Record<string, string[]>; // { url: ['H2...', 'H3...'] }
  analyzed_at: string;
}
