
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
    const checkForExistingAnalysis = async () => {
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
      
      // Call edge function to analyze resume
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No active session found. Please sign in again.");
      
      const { data, error } = await supabase.functions.invoke("analyze-resume", {
        body: {
          resumeFilePath: uploadedFilePath,
          jobDescription: jobDescription,
          user_id: user.id,
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
