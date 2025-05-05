import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";

export function useAnalyzeLogic() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // Check if there is an analysis ID in the query params
    const checkForExistingAnalysis = async () => {
      if (!user?.id) return;
      
      // Check for an ID in query params
      const queryParams = new URLSearchParams(window.location.search);
      const analysisId = queryParams.get('id');
      
      try {
        const { data, error } = await supabase
          .from("resume_analysis")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1);
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          // If an ID was specified, fetch that specific analysis
          if (analysisId) {
            const { data: specificAnalysis, error: specificError } = await supabase
              .from("resume_analysis")
              .select("*")
              .eq("id", analysisId)
              .eq("user_id", user.id)
              .single();
              
            if (!specificError && specificAnalysis) {
              setAnalysisComplete(true);
              setAnalysisResults(specificAnalysis);
              setActiveTab("results");
              return;
            }
          }
          
          // Otherwise, show the most recent analysis
          setAnalysisComplete(true);
          setAnalysisResults(data[0]);
        }
      } catch (error) {
        console.error("Error checking for existing analysis:", error);
      }
    };
    
    checkForExistingAnalysis();
  }, [user]);

  const saveResumeToStorage = async (file: File): Promise<string> => {
    if (!user?.id) throw new Error("User not authenticated");
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;
    
    const { error } = await supabase.storage
      .from("resumes")
      .upload(filePath, file, { upsert: true });
      
    if (error) throw error;
    return filePath;
  };

  const handleAnalyze = async () => {
    if (!resumeFile) {
      toast({ title: "Missing resume", description: "Please upload your resume first.", variant: "destructive" });
      return;
    }
    if (!jobDescription) {
      toast({ title: "Missing job description", description: "Please paste the job description to compare against.", variant: "destructive" });
      return;
    }
    if (!user?.id) {
      toast({ title: "Not signed in", description: "You must be signed in to analyze your resume.", variant: "destructive" });
      return;
    }
    
    setIsAnalyzing(true);
    let uploadedFilePath = "";
    
    try {
      // Save resume to storage and get file path
      uploadedFilePath = await saveResumeToStorage(resumeFile);
      console.log("Resume saved to storage at:", uploadedFilePath);
      
      // Get current session for authorization
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No active session found. Please sign in again.");
      
      // Call edge function to analyze resume with a unique timestamp to prevent caching
      const timestamp = Date.now();
      const { data, error } = await supabase.functions.invoke("analyze-resume", {
        body: {
          resumeFilePath: uploadedFilePath,
          jobDescription: jobDescription,
          user_id: user.id,
          timestamp: timestamp // Add timestamp to prevent caching
        },
      });
      
      if (error) throw new Error(`Error during resume analysis: ${error.message}`);
      
      console.log("Analysis complete:", data);
      
      // Set analysis results for display
      setAnalysisResults(data);
      setAnalysisComplete(true);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete",
        description: `Your resume scored ${data.ats_score || 0}% for ATS compatibility.`,
      });
      
      setActiveTab("results");
    } catch (e: any) {
      setIsAnalyzing(false);
      toast({ 
        title: "Analysis failed", 
        description: e.message || "Failed to analyze resume.", 
        variant: "destructive" 
      });
    }
  };

  return {
    resumeFile,
    setResumeFile,
    jobDescription,
    setJobDescription,
    isAnalyzing,
    analysisComplete,
    analysisResults,
    activeTab,
    setActiveTab,
    handleAnalyze,
  };
}
