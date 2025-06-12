
export interface AnalysisResult {
  id: string;
  ats_score: number;
  keyword_score: number;
  formatting_score: number;
  content_score: number;
  missing_keywords: string[];
  improvement_suggestions: string[];
  created_at: string;
}

export interface AnalysisResultsProps {
  analysisResult?: AnalysisResult | null;
}
