
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import ResumeUpload from "@/components/analyze/ResumeUpload";
import JobDescription from "@/components/analyze/JobDescription";
import AnalysisResults from "@/components/analyze/AnalysisResults";

interface AnalyzeTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  resumeFile: File | null;
  jobDescription: string;
  isAnalyzing: boolean;
  analysisComplete: boolean;
  setResumeFile: (file: File | null) => void;
  setJobDescription: (desc: string) => void;
  onAnalyze: () => Promise<void>;
}

const AnalyzeTabs = ({
  activeTab,
  onTabChange,
  resumeFile,
  jobDescription,
  isAnalyzing,
  analysisComplete,
  setResumeFile,
  setJobDescription,
  onAnalyze,
}: AnalyzeTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
        <TabsTrigger value="results" disabled={!analysisComplete}>
          Results & Recommendations
        </TabsTrigger>
      </TabsList>
      <TabsContent value="upload">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ResumeUpload onFileChange={setResumeFile} resumeFile={resumeFile} />
          <JobDescription value={jobDescription} onChange={setJobDescription} />
        </div>
        <div className="mt-8 text-center">
          <Button
            onClick={onAnalyze}
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
  );
};

export default AnalyzeTabs;
