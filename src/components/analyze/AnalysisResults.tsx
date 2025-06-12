
import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { AnalysisResult, AnalysisResultsProps } from "./types";
import AtsSummaryCard from "./AtsSummaryCard";
import KeywordMatchingCard from "./KeywordMatchingCard";
import FormattingScoreCard from "./FormattingScoreCard";
import ContentScoreCard from "./ContentScoreCard";
import DetailedRecommendationsCard from "./DetailedRecommendationsCard";
import LoadingSkeleton from "./LoadingSkeleton";

const AnalysisResults = ({ analysisResult: propResult }: AnalysisResultsProps) => {
  const [isLoading, setIsLoading] = useState(!propResult);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(propResult || null);
  const { user } = useAuth();

  useEffect(() => {
    // If we have props result, use it and skip fetching
    if (propResult) {
      setAnalysisResult(propResult);
      setIsLoading(false);
      return;
    }

    const fetchAnalysisResults = async () => {
      if (!user?.id) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("resume_analysis")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();
          
        if (error) throw error;
        
        setAnalysisResult(data);
      } catch (error) {
        console.error("Error fetching analysis results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysisResults();
  }, [user, propResult]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!analysisResult) {
    return (
      <div className="text-center p-10">
        <AlertCircle className="w-16 h-16 mx-auto text-amber-500 mb-4" />
        <h3 className="text-xl font-medium mb-2">No Analysis Results Found</h3>
        <p className="text-gray-500 mb-6">
          It looks like you haven't analyzed any resumes yet. Go back to the Upload tab to analyze your resume.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Overall ATS Score */}
      <AtsSummaryCard score={analysisResult.ats_score} />
      
      {/* Detail Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KeywordMatchingCard 
          score={analysisResult.keyword_score} 
          missingKeywords={analysisResult.missing_keywords} 
        />
        <FormattingScoreCard score={analysisResult.formatting_score} />
        <ContentScoreCard score={analysisResult.content_score} />
      </div>
      
      {/* Detailed Recommendations */}
      <DetailedRecommendationsCard suggestions={analysisResult.improvement_suggestions} />
      
      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button variant="outline">Download Analysis Report</Button>
        <Button>Build Optimized Resume</Button>
      </div>
    </div>
  );
};

export default AnalysisResults;
