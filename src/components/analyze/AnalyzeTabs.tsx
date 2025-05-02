
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResumeUpload from "./ResumeUpload";
import JobDescription from "./JobDescription";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import AnalysisResults from "./AnalysisResults";

interface AnalyzeTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  resumeFile: File | null;
  jobDescription: string;
  isAnalyzing: boolean;
  analysisComplete: boolean;
  analysisResults?: any;
  setResumeFile: (file: File) => void;
  setJobDescription: (value: string) => void;
  onAnalyze: () => void;
}

const AnalyzeTabs = ({
  activeTab,
  onTabChange,
  resumeFile,
  jobDescription,
  isAnalyzing,
  analysisComplete,
  analysisResults,
  setResumeFile,
  setJobDescription,
  onAnalyze,
}: AnalyzeTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
        <TabsTrigger value="results" disabled={!analysisComplete}>
          Results
        </TabsTrigger>
      </TabsList>
      <TabsContent value="upload" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ResumeUpload onFileChange={setResumeFile} resumeFile={resumeFile} />
          <JobDescription
            value={jobDescription}
            onChange={setJobDescription}
          />
        </div>
        <div className="mt-8">
          <Button
            onClick={onAnalyze}
            disabled={isAnalyzing || !resumeFile || !jobDescription}
            className="px-8 py-6 text-lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              "Analyze Resume"
            )}
          </Button>
          {isAnalyzing && (
            <p className="text-sm text-gray-500 mt-2">
              This usually takes less than a minute. We're comparing your resume
              against the job description...
            </p>
          )}
        </div>
      </TabsContent>
      <TabsContent value="results" className="mt-6">
        {analysisComplete && <AnalysisResults results={analysisResults} />}
      </TabsContent>
    </Tabs>
  );
};

export default AnalyzeTabs;
