import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, FileText, FileCheck, BarChart2 } from "lucide-react";
import AnalysisScore from "./AnalysisScore";

const AnalysisResults = () => {
  return (
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
        <AnalysisScore
          title="Keyword Matching"
          icon={Search}
          score={68}
          items={[
            { type: "error", text: ".NET Core" },
            { type: "error", text: "MudBlazor" },
            { type: "error", text: "ASP.NET Identity" },
            { type: "error", text: "Blazor" }
          ]}
        />
        
        <AnalysisScore
          title="Formatting"
          icon={FileText}
          score={85}
          items={[
            { type: "success", text: "Good use of section headings" },
            { type: "success", text: "Appropriate resume length" },
            { type: "error", text: "Complex tables may not parse correctly" }
          ]}
        />
        
        <AnalysisScore
          title="Content Quality"
          icon={FileCheck}
          score={75}
          items={[
            { type: "warning", text: "Use more achievement-oriented bullet points" },
            { type: "warning", text: "Quantify your accomplishments with metrics" },
            { type: "error", text: "Skills section needs more specificity" }
          ]}
        />
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
  );
};

export default AnalysisResults;
