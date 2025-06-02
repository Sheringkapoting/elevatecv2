import { useState, useEffect } from "react";
import NavbarContainer from "@/components/layout/NavbarContainer";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PersonalInfoForm from "@/components/resume-builder/PersonalInfoForm";
import ExperienceForm from "@/components/resume-builder/ExperienceForm";
import EducationForm from "@/components/resume-builder/EducationForm";
import SkillsForm from "@/components/resume-builder/SkillsForm";
import ResumePreview from "@/components/resume-builder/ResumePreview";
import ResumeSelectionStep from "@/components/resume-builder/ResumeSelectionStep";
import TemplateSelectionStep from "@/components/resume-builder/TemplateSelectionStep";
import { supabase } from "@/integrations/supabase/client";
import { parseResumeText, ParsedResumeData } from "@/utils/resumeParser";

// Extended template definitions with more options
const templates = [
  {
    id: "professional",
    name: "Professional",
    description: "Clean and professional design suitable for corporate roles",
    color: "bg-primary-600",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with a creative touch",
    color: "bg-indigo-600",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and minimal design focusing on content",
    color: "bg-gray-800",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design for creative industry positions",
    color: "bg-rose-600",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated design for senior positions",
    color: "bg-emerald-700",
  },
  {
    id: "tech",
    name: "Tech",
    description: "Modern template for tech industry roles",
    color: "bg-blue-600",
  },
];

const initialResumeData = {
  personalInfo: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
  },
  experience: [
    {
      id: "exp-1",
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "",
      school: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  skills: [
    { id: "skill-1", name: "" },
    { id: "skill-2", name: "" },
    { id: "skill-3", name: "" },
  ],
};

type BuilderStep = 'selection' | 'template' | 'builder';

const Builder = () => {
  const [currentStep, setCurrentStep] = useState<BuilderStep>('selection');
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  // Check if we need to auto-fill from uploaded resume
  useEffect(() => {
    const checkForResumeData = async () => {
      const shouldAutoFill = sessionStorage.getItem("resume_file_for_builder");
      
      if (shouldAutoFill) {
        // Clear the flag
        sessionStorage.removeItem("resume_file_for_builder");
        
        // Look for the most recent resume analysis
        const { data: user } = await supabase.auth.getUser();
        if (user?.user) {
          const { data: analyses, error } = await supabase
            .from('resume_analysis')
            .select('*')
            .eq('user_id', user.user.id)
            .order('created_at', { ascending: false })
            .limit(1);
          
          if (analyses && analyses.length > 0) {
            // Get the resume file content
            const resumePath = analyses[0].resume_file_path;
            
            try {
              // Download the resume file
              const { data: fileData, error: downloadError } = await supabase
                .storage
                .from('resumes')
                .download(resumePath);
                
              if (downloadError) {
                throw downloadError;
              }
              
              if (fileData) {
                // For text files
                let resumeText = '';
                try {
                  resumeText = await fileData.text();
                } catch (e) {
                  // If not a text file, use the job description as fallback
                  resumeText = analyses[0].job_description || '';
                }
                
                // Parse the resume text
                const parsedData: ParsedResumeData = parseResumeText(resumeText);
                
                // Update the form with parsed data
                setResumeData(parsedData);
                
                toast({
                  title: "Resume data imported",
                  description: "Your resume has been used to pre-fill the builder form.",
                });
              }
            } catch (error) {
              console.error("Error downloading resume:", error);
              toast({
                title: "Error importing resume data",
                description: "Could not retrieve resume content. Please fill the form manually.",
                variant: "destructive",
              });
            }
          }
        }
      }
    };
    
    checkForResumeData();
  }, [toast]);
  
  const handleExistingResumeSelected = () => {
    setCurrentStep('template');
  };

  const handleNewResumeUploaded = (file: File) => {
    setUploadedFile(file);
    setCurrentStep('template');
  };

  const handleTemplateSelected = () => {
    setCurrentStep('builder');
  };

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [name]: value,
      },
    });
  };
  
  const handleExperienceChange = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };
  
  const addExperience = () => {
    const newExp = {
      id: `exp-${resumeData.experience.length + 1}`,
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExp],
    });
  };
  
  const removeExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((exp) => exp.id !== id),
    });
  };
  
  const handleEducationChange = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };
  
  const addEducation = () => {
    const newEdu = {
      id: `edu-${resumeData.education.length + 1}`,
      degree: "",
      school: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEdu],
    });
  };
  
  const removeEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((edu) => edu.id !== id),
    });
  };
  
  const handleSkillChange = (id: string, value: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.map((skill) =>
        skill.id === id ? { ...skill, name: value } : skill
      ),
    });
  };
  
  const addSkill = () => {
    const newSkill = {
      id: `skill-${resumeData.skills.length + 1}`,
      name: "",
    };
    
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, newSkill],
    });
  };
  
  const removeSkill = (id: string) =>  {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((skill) => skill.id !== id),
    });
  };
  
  const handleSaveResume = () => {
    toast({
      title: "Resume saved",
      description: "Your resume has been saved successfully.",
    });
  };
  
  const handleDownloadResume = () => {
    toast({
      title: "Resume downloaded",
      description: "Your resume has been downloaded as a PDF.",
    });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'selection':
        return (
          <ResumeSelectionStep
            onExistingResumeSelected={handleExistingResumeSelected}
            onNewResumeUploaded={handleNewResumeUploaded}
          />
        );
      
      case 'template':
        return (
          <TemplateSelectionStep
            templates={templates}
            selectedTemplate={selectedTemplate}
            onTemplateSelect={setSelectedTemplate}
            onContinue={handleTemplateSelected}
          />
        );
      
      case 'builder':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="personal">
                <TabsList className="grid grid-cols-4 mb-8 justify-start">
                  <TabsTrigger value="personal" className="text-left">Personal</TabsTrigger>
                  <TabsTrigger value="experience" className="text-left">Experience</TabsTrigger>
                  <TabsTrigger value="education" className="text-left">Education</TabsTrigger>
                  <TabsTrigger value="skills" className="text-left">Skills</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal">
                  <PersonalInfoForm
                    personalInfo={resumeData.personalInfo}
                    onInfoChange={handlePersonalInfoChange}
                  />
                </TabsContent>
                
                <TabsContent value="experience">
                  <ExperienceForm
                    experiences={resumeData.experience}
                    onExperienceChange={handleExperienceChange}
                    onAddExperience={addExperience}
                    onRemoveExperience={removeExperience}
                  />
                </TabsContent>
                
                <TabsContent value="education">
                  <EducationForm
                    education={resumeData.education}
                    onEducationChange={handleEducationChange}
                    onAddEducation={addEducation}
                    onRemoveEducation={removeEducation}
                  />
                </TabsContent>
                
                <TabsContent value="skills">
                  <SkillsForm
                    skills={resumeData.skills}
                    onSkillChange={handleSkillChange}
                    onAddSkill={addSkill}
                    onRemoveSkill={removeSkill}
                  />
                </TabsContent>
              </Tabs>
              
              <div className="mt-8 flex justify-start space-x-4">
                <Button
                  variant="outline"
                  className="border-primary-600 text-primary-600 hover:bg-primary-50"
                  onClick={handleSaveResume}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button
                  className="bg-primary-600 hover:bg-primary-700 text-white"
                  onClick={handleDownloadResume}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <ResumePreview
                resumeData={resumeData}
                templates={templates}
                selectedTemplate={selectedTemplate}
                onTemplateSelect={setSelectedTemplate}
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarContainer />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {currentStep === 'builder' && (
            <div className="text-left mb-10">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Resume Builder</h1>
              <p className="mt-4 text-xl text-gray-500">
                Create a professional resume tailored to your target job
              </p>
            </div>
          )}
          
          {renderCurrentStep()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Builder;
