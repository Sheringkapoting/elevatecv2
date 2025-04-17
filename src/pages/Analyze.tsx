
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Upload, FileText, Clock, CheckCircle, XCircle, AlertCircle, 
  BarChart2, Search, User, Briefcase, Award, Calendar, Mail, Phone, FileCheck
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Analyze = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const { toast } = useToast();
  
  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
      toast({
        title: "Resume uploaded",
        description: `File "${e.target.files[0].name}" ready for analysis.`,
      });
    }
  };
  
  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };
  
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
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <FileText className="h-5 w-5 text-primary-600" />
                        <h2 className="text-xl font-medium text-gray-900">Upload Resume</h2>
                      </div>
                      
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors cursor-pointer">
                        <input
                          type="file"
                          id="resume-upload"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleResumeUpload}
                        />
                        <label htmlFor="resume-upload" className="cursor-pointer">
                          <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                          <p className="text-base font-medium text-gray-900 mb-1">
                            {resumeFile ? resumeFile.name : "Click to upload your resume"}
                          </p>
                          <p className="text-sm text-gray-500">
                            PDF, DOC, or DOCX up to 5MB
                          </p>
                        </label>
                      </div>
                      
                      {resumeFile && (
                        <div className="flex items-center space-x-2 text-sm text-primary-600 font-medium">
                          <CheckCircle className="h-4 w-4" />
                          <span>Resume ready for analysis</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <Search className="h-5 w-5 text-primary-600" />
                        <h2 className="text-xl font-medium text-gray-900">Job Description</h2>
                      </div>
                      
                      <div>
                        <textarea
                          className="w-full h-[230px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                          placeholder="Paste the job description here to compare against your resume..."
                          value={jobDescription}
                          onChange={handleJobDescriptionChange}
                        ></textarea>
                      </div>
                      
                      {jobDescription && (
                        <div className="flex items-center space-x-2 text-sm text-primary-600 font-medium">
                          <CheckCircle className="h-4 w-4" />
                          <span>Job description ready for analysis</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
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
              <div className="space-y-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between">
                      <div className="flex items-center mb-4 md:mb-0">
                        <div className="mr-6">
                          <div className="relative h-24 w-24">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-2xl font-bold text-primary-600">76%</span>
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
                                strokeDashoffset="68"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-medium text-gray-900 mb-1">
                            ATS Compatibility Score
                          </h3>
                          <p className="text-gray-500">
                            Your resume is fairly compatible with ATS systems
                          </p>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-50">
                        Download Full Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Search className="h-5 w-5 text-primary-600" />
                            <h3 className="font-medium text-gray-900">Keyword Matching</h3>
                          </div>
                          <div className="text-lg font-medium text-primary-600">68%</div>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                        </div>
                        
                        <div className="pt-2">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Missing Keywords:</h4>
                          <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              .NET Core
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              MudBlazor
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              ASP.NET Identity
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Blazor
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-primary-600" />
                            <h3 className="font-medium text-gray-900">Formatting</h3>
                          </div>
                          <div className="text-lg font-medium text-primary-600">85%</div>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        
                        <div className="space-y-2 pt-2">
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600">Good use of section headings</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600">Appropriate resume length</span>
                          </div>
                          <div className="flex items-start">
                            <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600">Complex tables may not parse correctly</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FileCheck className="h-5 w-5 text-primary-600" />
                            <h3 className="font-medium text-gray-900">Content Quality</h3>
                          </div>
                          <div className="text-lg font-medium text-primary-600">75%</div>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        
                        <div className="space-y-2 pt-2">
                          <div className="flex items-start">
                            <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600">Use more achievement-oriented bullet points</span>
                          </div>
                          <div className="flex items-start">
                            <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600">Quantify your accomplishments with metrics</span>
                          </div>
                          <div className="flex items-start">
                            <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600">Skills section needs more specificity</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-2">
                        <BarChart2 className="h-5 w-5 text-primary-600" />
                        <h3 className="text-xl font-medium text-gray-900">Detailed Recommendations</h3>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="pb-4 border-b border-gray-200">
                          <h4 className="text-lg font-medium text-gray-900 mb-2">Add Missing Technical Skills</h4>
                          <p className="text-gray-600 mb-4">
                            The job description emphasizes .NET technologies that are missing from your resume.
                          </p>
                          <div className="bg-primary-50 border-l-4 border-primary-500 p-4">
                            <p className="text-sm text-gray-600">
                              <strong>Suggestion:</strong> Add a dedicated "Technical Skills" section that includes:
                              .NET Core, ASP.NET Identity, Blazor, MudBlazor, and other .NET-related technologies
                              mentioned in the job description.
                            </p>
                          </div>
                        </div>
                        
                        <div className="pb-4 border-b border-gray-200">
                          <h4 className="text-lg font-medium text-gray-900 mb-2">Highlight Relevant Experience</h4>
                          <p className="text-gray-600 mb-4">
                            Your work experience needs to better align with the job requirements.
                          </p>
                          <div className="bg-primary-50 border-l-4 border-primary-500 p-4">
                            <p className="text-sm text-gray-600">
                              <strong>Suggestion:</strong> Restructure your experience bullet points to showcase:
                              <br />- Experience with .NET frameworks and libraries
                              <br />- Frontend development skills with Blazor
                              <br />- Authentication implementation using ASP.NET Identity
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-2">Enhance Resume Formatting</h4>
                          <p className="text-gray-600 mb-4">
                            While your formatting is generally good, there are some improvements to make it more ATS-friendly.
                          </p>
                          <div className="bg-primary-50 border-l-4 border-primary-500 p-4">
                            <p className="text-sm text-gray-600">
                              <strong>Suggestion:</strong> Replace tables with simple formatting, use standard section headings
                              (e.g., "Experience", "Skills", "Education"), and ensure your contact information is at the top
                              of the resume in plain text format.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-50">
                    Download Analysis Report
                  </Button>
                  <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                    Build Optimized Resume
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analyze;
