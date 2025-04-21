
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, FileText, FileCheck, BarChart2, Download } from "lucide-react";
import AnalysisScore from "./AnalysisScore";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const AnalysisResults = () => {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchLatestAnalysis = async () => {
      if (!user?.id) return;
      
      try {
        const { data, error } = await supabase
          .from("resume_analysis")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1);
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          setAnalysisData(data[0]);
        }
      } catch (error: any) {
        console.error("Error fetching analysis:", error.message);
        toast({
          title: "Error",
          description: "Failed to load analysis results.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLatestAnalysis();
  }, [user, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 mb-4">No analysis results available. Please analyze a resume first.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="mr-6">
                <div className="relative h-24 w-24">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-600">{analysisData.ats_score}%</span>
                  </div>
                  <svg className="h-24 w-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#E0EFFF" strokeWidth="10" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#147EFB"
                      strokeWidth="10"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * analysisData.ats_score) / 100}
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-1">
                  ATS Compatibility Score
                </h3>
                <p className="text-gray-500">
                  {analysisData.ats_score >= 80 
                    ? "Your resume is highly compatible with ATS systems" 
                    : analysisData.ats_score >= 60 
                      ? "Your resume is fairly compatible with ATS systems" 
                      : "Your resume needs improvement for ATS compatibility"}
                </p>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="border-primary-600 text-primary-600 hover:bg-primary-50"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalysisScore
          title="Keyword Matching"
          icon={Search}
          score={analysisData.keyword_score}
          items={analysisData.missing_keywords.map((kw: string) => ({ 
            type: "error", 
            text: kw 
          }))}
        />
        
        <AnalysisScore
          title="Formatting"
          icon={FileText}
          score={analysisData.formatting_score}
          items={[
            { type: analysisData.formatting_score >= 80 ? "success" : "warning", 
              text: analysisData.formatting_score >= 80 
                ? "Good use of section headings" 
                : "Improve section headings and organization" },
            { type: analysisData.formatting_score >= 60 ? "success" : "warning", 
              text: "Document structure and readability" },
            { type: analysisData.formatting_score >= 70 ? "success" : "error", 
              text: analysisData.formatting_score >= 70 
                ? "Appropriate resume length" 
                : "Optimize resume length and format" }
          ]}
        />
        
        <AnalysisScore
          title="Content Quality"
          icon={FileCheck}
          score={analysisData.content_score}
          items={[
            { type: analysisData.content_score >= 70 ? "success" : "warning", 
              text: analysisData.content_score >= 70 
                ? "Effective use of bullet points" 
                : "Use more achievement-oriented bullet points" },
            { type: analysisData.content_score >= 80 ? "success" : "warning", 
              text: analysisData.content_score >= 80 
                ? "Good use of metrics and numbers" 
                : "Quantify your accomplishments with metrics" },
            { type: analysisData.content_score >= 75 ? "success" : "error", 
              text: analysisData.content_score >= 75 
                ? "Skills clearly presented" 
                : "Skills section needs more specificity" }
          ]}
        />
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <BarChart2 className="h-5 w-5 text-primary-600" />
              <h3 className="text-xl font-medium text-gray-900">Improvement Suggestions</h3>
            </div>
            
            <div className="space-y-6">
              {analysisData.improvement_suggestions.map((suggestion: string, index: number) => (
                <div key={index} className={index < analysisData.improvement_suggestions.length - 1 ? "pb-4 border-b border-gray-200" : ""}>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    Suggestion {index + 1}
                  </h4>
                  <div className="bg-primary-50 border-l-4 border-primary-500 p-4">
                    <p className="text-sm text-gray-600">
                      {suggestion}
                    </p>
                  </div>
                </div>
              ))}
              
              {analysisData.improvement_suggestions.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-gray-500">Great job! Your resume looks good and no major improvements were identified.</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-center space-x-4">
        <Button variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-50">
          <Download className="mr-2 h-4 w-4" />
          Download Analysis Report
        </Button>
        <Button className="bg-primary-600 hover:bg-primary-700 text-white">
          Build Optimized Resume
        </Button>
      </div>
    </div>
  );
};

export default AnalysisResults;
