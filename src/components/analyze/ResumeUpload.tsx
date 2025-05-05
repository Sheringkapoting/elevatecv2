
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, CheckCircle, FileText, AlertCircle } from "lucide-react";

interface ResumeUploadProps {
  onFileChange: (file: File) => void;
  resumeFile: File | null;
}

const ResumeUpload = ({ onFileChange, resumeFile }: ResumeUploadProps) => {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string>("");

  const validateFile = (file: File): boolean => {
    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setFileError("File must be PDF, DOC, or DOCX format");
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, or DOCX file.",
        variant: "destructive"
      });
      return false;
    }
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File exceeds 5MB size limit");
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB.",
        variant: "destructive"
      });
      return false;
    }
    
    setFileError("");
    return true;
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onFileChange(file);
        toast({
          title: "Resume uploaded",
          description: `File "${file.name}" ready for analysis.`,
        });
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onFileChange(file);
        toast({
          title: "Resume uploaded",
          description: `File "${file.name}" ready for analysis.`,
        });
      }
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
          
          <div 
            className={`border-2 ${dragActive ? 'border-primary-500' : 'border-dashed border-gray-300'} 
              rounded-lg p-8 text-center hover:border-primary-500 transition-colors cursor-pointer
              ${fileError ? 'border-red-300 bg-red-50' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="resume-upload"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
            />
            <label htmlFor="resume-upload" className="cursor-pointer">
              {fileError ? (
                <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
              ) : resumeFile ? (
                <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-4" />
              ) : (
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
              )}
              
              {fileError ? (
                <p className="text-base font-medium text-red-600 mb-1">
                  {fileError}
                </p>
              ) : (
                <p className="text-base font-medium text-gray-900 mb-1">
                  {resumeFile ? resumeFile.name : "Click to upload your resume"}
                </p>
              )}
              
              <p className="text-sm text-gray-500">
                {resumeFile ? (
                  `${(resumeFile.size / (1024 * 1024)).toFixed(2)} MB`
                ) : (
                  "PDF, DOC, or DOCX up to 5MB"
                )}
              </p>
              
              {resumeFile && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={(e) => {
                    e.preventDefault();
                    onFileChange(null as any);
                  }}
                >
                  Change file
                </Button>
              )}
            </label>
          </div>
          
          {resumeFile && !fileError && (
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
