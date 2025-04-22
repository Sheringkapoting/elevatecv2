
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
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const checkForExistingAnalysis = async () => {
      if (!user?.id) return;
      try {
        const { data, error } = await supabase
          .from("resume_analysis")
          .select("id")
          .eq("user_id", user.id)
          .limit(1);
        if (error) throw error;
        if (data && data.length > 0) setAnalysisComplete(true);
      } catch (error) {
        console.error("Error checking for existing analysis:", error);
      }
    };
    checkForExistingAnalysis();
  }, [user]);

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
      const path = `${user.id}/${resumeFile.name}`;
      const { error: uploadError } = await supabase.storage.from("resumes").upload(path, resumeFile, { upsert: true });
      if (uploadError) throw uploadError;
      uploadedFilePath = path;
    } catch (e: any) {
      setIsAnalyzing(false);
      toast({ title: "Upload failed", description: e.message || "Failed to upload the resume file.", variant: "destructive" });
      return;
    }
    try {
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
      setAnalysisComplete(true);
      setIsAnalyzing(false);
      toast({
        title: "Analysis complete",
        description: `Your resume scored ${data.ats_score || 0}% for ATS compatibility.`,
      });
      setActiveTab("results");
    } catch (e: any) {
      setIsAnalyzing(false);
      toast({ title: "Analysis failed", description: e.message || "Failed to analyze resume.", variant: "destructive" });
    }
  };

  return {
    resumeFile,
    setResumeFile,
    jobDescription,
    setJobDescription,
    isAnalyzing,
    analysisComplete,
    activeTab,
    setActiveTab,
    handleAnalyze,
  };
}
