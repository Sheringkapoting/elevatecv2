
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, CheckCircle, FileText } from "lucide-react";

interface ResumeUploadProps {
  onFileChange: (file: File) => void;
  resumeFile: File | null;
}

const ResumeUpload = ({ onFileChange, resumeFile }: ResumeUploadProps) => {
  const { toast } = useToast();

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileChange(e.target.files[0]);
      toast({
        title: "Resume uploaded",
        description: `File "${e.target.files[0].name}" ready for analysis.`,
      });
    }
  };

  return (
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
  );
};

export default ResumeUpload;
