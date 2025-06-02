
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

interface ResumeSelectionStepProps {
  onExistingResumeSelected: () => void;
  onNewResumeUploaded: (file: File) => void;
}

const ResumeSelectionStep = ({ onExistingResumeSelected, onNewResumeUploaded }: ResumeSelectionStepProps) => {
  const [hasExistingResume, setHasExistingResume] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const checkForExistingResume = async () => {
      if (!user?.id) return;
      
      try {
        const { data, error } = await supabase
          .from("resume_analysis")
          .select("id")
          .eq("user_id", user.id)
          .limit(1);
        
        if (error) throw error;
        
        setHasExistingResume(data && data.length > 0);
      } catch (error) {
        console.error("Error checking for existing resume:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkForExistingResume();
  }, [user]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, DOC, or DOCX file.",
          variant: "destructive"
        });
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 5MB.",
          variant: "destructive"
        });
        return;
      }
      
      onNewResumeUploaded(file);
      toast({
        title: "Resume uploaded",
        description: "Your resume has been uploaded successfully.",
      });
    }
  };

  const handleUseExistingResume = () => {
    // Set flag for auto-fill from existing resume
    sessionStorage.setItem("resume_file_for_builder", "true");
    onExistingResumeSelected();
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Checking for existing resumes...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto text-center py-12">
      {/* Header with avatar and message */}
      <div className="mb-12">
        <div className="relative mx-auto w-32 h-32 mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-orange-100 rounded-full"></div>
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
            <img 
              src="/lovable-uploads/53fcfbed-c50f-4d70-b285-266e953cc988.png" 
              alt="Assistant" 
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Great. Please upload it for a quick start.
        </h2>
      </div>

      {/* Resume upload/selection options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {hasExistingResume && (
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleUseExistingResume}>
            <CardContent className="p-8 text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Use Existing Resume</h3>
              <p className="text-gray-600 mb-4">
                Use your previously analyzed resume to pre-fill the builder
              </p>
              <Button variant="outline" className="w-full">
                Use Existing Resume
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-8 text-center">
            <input
              type="file"
              id="new-resume-upload"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
            />
            <label htmlFor="new-resume-upload" className="cursor-pointer">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload New Resume</h3>
              <p className="text-gray-600 mb-4">
                Drop your resume here or choose a file.<br />
                PDF and docs only.
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Upload Resume
              </Button>
            </label>
          </CardContent>
        </Card>
      </div>

      {/* Privacy notice */}
      <div className="flex items-center justify-center text-sm text-gray-500">
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        We never share your data with 3rd parties or use it for AI model training.
      </div>
    </div>
  );
};

export default ResumeSelectionStep;
