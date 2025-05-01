
import NavbarContainer from "@/components/layout/NavbarContainer";
import Footer from "@/components/layout/Footer";
import AnalyzeHeader from "@/components/analyze/AnalyzeHeader";
import AnalyzeTabs from "@/components/analyze/AnalyzeTabs";
import { useAnalyzeLogic } from "@/components/analyze/useAnalyzeLogic";

const Analyze = () => {
  const {
    resumeFile,
    setResumeFile,
    jobDescription,
    setJobDescription,
    isAnalyzing,
    analysisComplete,
    activeTab,
    setActiveTab,
    handleAnalyze,
  } = useAnalyzeLogic();

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarContainer />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnalyzeHeader />
          <AnalyzeTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            resumeFile={resumeFile}
            jobDescription={jobDescription}
            isAnalyzing={isAnalyzing}
            analysisComplete={analysisComplete}
            setResumeFile={setResumeFile}
            setJobDescription={setJobDescription}
            onAnalyze={handleAnalyze}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Analyze;
