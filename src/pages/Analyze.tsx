
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ResumeUpload from "@/components/analyze/ResumeUpload";
import JobDescription from "@/components/analyze/JobDescription";
import AnalysisResults from "@/components/analyze/AnalysisResults";

const Analyze = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = () => {
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
    
    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      toast({
        title: "Analysis complete",
        description: "Your resume has been analyzed against the job description.",
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Resume Analysis</h1>
            <p className="mt-4 text-xl text-gray-500">
              Analyze your resume against job descriptions to increase your interview chances
            </p>
          </div>
          
          <Tabs defaultValue="upload" className="max-w-4xl mx-auto">
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
