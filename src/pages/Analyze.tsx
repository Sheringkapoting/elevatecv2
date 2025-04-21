
import { useState } from "react";
import NavbarContainer from "@/components/layout/NavbarContainer";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ResumeUpload from "@/components/analyze/ResumeUpload";
import JobDescription from "@/components/analyze/JobDescription";
import AnalysisResults from "@/components/analyze/AnalysisResults";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";

const Analyze = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const { toast } = useToast();
  const { user } = useAuth();

  // Check if the user has any analysis results
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
        
        if (data && data.length > 0) {
          setAnalysisComplete(true);
        }
      } catch (error) {
        console.error("Error checking for existing analysis:", error);
      }
    };

    checkForExistingAnalysis();
  }, [user]);

  const handleAnalyze = async () => {
    if (!resumeFile) {
      toast({
        title: "Missing resume",
        description: "Please upload your resume first.",
        variant: "destructive",
      });
      return;
    }

    if (!jobDescription) {
      toast({
        title: "Missing job description",
        description: "Please paste the job description to compare against.",
        variant: "destructive",
      });
      return;
    }

    if (!user?.id) {
      toast({
        title: "Not signed in",
        description: "You must be signed in to analyze your resume.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // 1. Upload resume to storage
    let uploadedFilePath = "";
    try {
      // Use user id as folder: user.id/filename
      const path = `${user.id}/${resumeFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(path, resumeFile, { upsert: true });
      if (uploadError) throw uploadError;
      uploadedFilePath = path;
      console.log("Resume uploaded to:", uploadedFilePath);
    } catch (e: any) {
      setIsAnalyzing(false);
      toast({
        title: "Upload failed",
        description: e.message || "Failed to upload the resume file.",
        variant: "destructive",
      });
      return;
    }

    // 2. Call edge function to analyze
    try {
      console.log("Calling analyze-resume edge function...");
      
      // Get the current session for authentication
      const { data: sessionData } = await supabase.auth.getSession();
      
      // Call the function with authentication
      const { data, error } = await supabase.functions.invoke("analyze-resume", {
        body: {
          resumeFilePath: uploadedFilePath,
          jobDescription: jobDescription,
          user_id: user.id,
        },
      });
      
      if (error) {
        console.error("Edge function error:", error);
        throw new Error(`Error during resume analysis: ${error.message}`);
      }
      
      console.log("Analysis result:", data);

      // Set analysis complete flag
      setAnalysisComplete(true);
      setIsAnalyzing(false);
      
      // Show success message
      toast({
        title: "Analysis complete",
        description: `Your resume scored ${data.ats_score || 0}% for ATS compatibility.`,
      });
      
      // Switch to results tab
      setActiveTab("results");

    } catch (e: any) {
      console.error("Analysis error:", e);
      setIsAnalyzing(false);
      toast({
        title: "Analysis failed",
        description: e.message || "Failed to analyze resume.",
        variant: "destructive",
      });
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarContainer />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Resume Analysis</h1>
            <p className="mt-4 text-xl text-gray-500">
              Analyze your resume against job descriptions to increase your interview chances
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={handleTabChange} className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
              <TabsTrigger value="results" disabled={!analysisComplete}>
                Results & Recommendations
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ResumeUpload 
                  onFileChange={setResumeFile}
                  resumeFile={resumeFile}
                />
                <JobDescription
                  value={jobDescription}
                  onChange={setJobDescription}
                />
              </div>
              
              <div className="mt-8 text-center">
                <Button 
                  onClick={handleAnalyze} 
                  disabled={isAnalyzing || !resumeFile || !jobDescription}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-6 text-base"
                >
                  {isAnalyzing ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Resume"
                  )}
                </Button>
                
                {isAnalyzing && (
                  <p className="mt-4 text-sm text-gray-500">
                    This usually takes less than a minute. We're comparing your resume against the job description...
                  </p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="results">
              <AnalysisResults />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analyze;
