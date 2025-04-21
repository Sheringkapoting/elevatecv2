
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface AnalysisResult {
  id: string;
  ats_score: number;
  keyword_score: number;
  formatting_score: number;
  content_score: number;
  missing_keywords: string[];
  improvement_suggestions: string[];
  created_at: string;
}

const AnalysisResults = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { user } = useAuth();

  useEffect(() => {
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
  }, [user]);

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
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="mr-6">
                <div className="relative">
                  <Progress value={analysisResult.ats_score} className="h-24 w-24 bg-gray-100" indicatorColor={getScoreColor(analysisResult.ats_score)} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{analysisResult.ats_score}%</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">ATS Compatibility Score</h3>
                <p className="text-gray-500">
                  {analysisResult.ats_score >= 80 ? "Excellent! Your resume is highly compatible with ATS systems." : 
                   analysisResult.ats_score >= 60 ? "Good! Your resume is fairly compatible with ATS systems." :
                   "Your resume needs improvement to be more compatible with ATS systems."}
                </p>
              </div>
            </div>
            
            <Button variant="outline" className="mt-4 md:mt-0">
              Download Full Report
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Detail Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Keyword Score */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Keyword Matching</span>
              <span className="text-lg font-bold">{analysisResult.keyword_score}%</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={analysisResult.keyword_score} className="h-2 mb-4" indicatorColor={getScoreColor(analysisResult.keyword_score)} />
            
            {analysisResult.missing_keywords && analysisResult.missing_keywords.length > 0 ? (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Missing important keywords:</p>
                <ul className="space-y-1">
                  {analysisResult.missing_keywords.map((keyword, index) => (
                    <li key={index} className="text-sm flex items-start">
                      <XCircle className="h-4 w-4 text-destructive mr-2 mt-px flex-shrink-0" />
                      <span>{keyword}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm mt-4">Great job! Your resume includes all the important keywords.</p>
            )}
          </CardContent>
        </Card>
        
        {/* Formatting Score */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Formatting</span>
              <span className="text-lg font-bold">{analysisResult.formatting_score}%</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={analysisResult.formatting_score} className="h-2 mb-4" indicatorColor={getScoreColor(analysisResult.formatting_score)} />
            
            <div className="space-y-2 mt-4">
              {analysisResult.formatting_score >= 80 ? (
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-px flex-shrink-0" />
                  <span className="text-sm">Excellent formatting for ATS systems</span>
                </div>
              ) : (
                <div className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-px flex-shrink-0" />
                  <span className="text-sm">Consider improving the structure with clear section headings</span>
                </div>
              )}
              
              {analysisResult.formatting_score < 60 && (
                <div className="flex items-start">
                  <XCircle className="h-4 w-4 text-destructive mr-2 mt-px flex-shrink-0" />
                  <span className="text-sm">Complex formatting may not parse correctly in ATS systems</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Content Score */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Content Quality</span>
              <span className="text-lg font-bold">{analysisResult.content_score}%</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={analysisResult.content_score} className="h-2 mb-4" indicatorColor={getScoreColor(analysisResult.content_score)} />
            
            <div className="space-y-2 mt-4">
              {analysisResult.content_score < 70 && (
                <div className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-px flex-shrink-0" />
                  <span className="text-sm">Use more achievement-oriented bullet points</span>
                </div>
              )}
              
              {analysisResult.content_score < 60 && (
                <div className="flex items-start">
                  <XCircle className="h-4 w-4 text-destructive mr-2 mt-px flex-shrink-0" />
                  <span className="text-sm">Quantify your achievements with metrics</span>
                </div>
              )}
              
              {analysisResult.content_score >= 70 && (
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-px flex-shrink-0" />
                  <span className="text-sm">Strong content with good details</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Detailed Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {analysisResult.improvement_suggestions && analysisResult.improvement_suggestions.length > 0 ? (
              analysisResult.improvement_suggestions.map((suggestion, index) => (
                <div key={index}>
                  {index > 0 && <Separator className="my-4" />}
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium mb-1">Improvement Suggestion</p>
                      <p className="text-gray-600">{suggestion}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No specific improvement suggestions. Your resume is well-optimized for ATS systems!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button variant="outline">Download Analysis Report</Button>
        <Button>Build Optimized Resume</Button>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="mr-6">
              <Skeleton className="h-24 w-24 rounded-full" />
            </div>
            <div>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <Skeleton className="h-10 w-40" />
        </div>
      </CardContent>
    </Card>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-12" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-2 w-full mb-6" />
            <div className="space-y-3 mt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

// Helper function to get color based on score
function getScoreColor(score: number): string {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-amber-500";
  return "bg-red-500";
}

export default AnalysisResults;
