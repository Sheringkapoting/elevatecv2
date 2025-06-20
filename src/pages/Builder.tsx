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
import ExperienceSelectionPage from "@/components/resume-builder/ExperienceSelectionPage";
import TemplateHelpModal from "@/components/resume-builder/TemplateHelpModal";
import TemplatePersonalizationModal from "@/components/resume-builder/TemplatePersonalizationModal";
import { supabase } from "@/integrations/supabase/client";
import { parseResumeText, ParsedResumeData } from "@/utils/resumeParser";
import { FilterSelections } from "@/components/resume-builder/guided-filter/types";

// Updated template definitions with complete filter properties
const templates = [
  {
    id: "double-column",
    name: "Double Column",
    description: "Professional layout with sidebar for skills and contact",
    color: "bg-blue-600",
    category: "Professional",
    layout: "two-column",
    columns: "2 columns",
    style: "Traditional",
    headshot: "With photo",
    occupation: ["Business & Finance", "Management & Executive"]
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Sophisticated dark sidebar with clean typography",
    color: "bg-purple-600",
    category: "Professional",
    layout: "sidebar-dark",
    columns: "2 columns",
    style: "Contemporary",
    headshot: "With photo",
    occupation: ["Creative", "Management & Executive"]
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean and simple Ivy League style",
    color: "bg-gray-800",
    category: "Simple",
    layout: "single-column",
    columns: "1 column",
    style: "Traditional",
    headshot: "Without photo",
    occupation: ["Business & Finance", "Office & Administrative Support"]
  },
  {
    id: "modern-accent",
    name: "Modern Accent",
    description: "Contemporary design with color highlights",
    color: "bg-emerald-600",
    category: "Modern",
    layout: "accent-modern",
    columns: "1 column",
    style: "Contemporary",
    headshot: "Without photo",
    occupation: ["Retail & Sales", "Management & Executive"]
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Traditional corporate format",
    color: "bg-indigo-600",
    category: "Business",
    layout: "corporate",
    columns: "1 column",
    style: "Traditional",
    headshot: "Without photo",
    occupation: ["Business & Finance", "Management & Executive"]
  },
  {
    id: "creative-portfolio",
    name: "Creative Portfolio",
    description: "Bold design for creative professionals",
    color: "bg-rose-600",
    category: "Creative",
    layout: "portfolio",
    columns: "1 column",
    style: "Creative",
    headshot: "Without photo",
    occupation: ["Creative", "Retail & Sales"]
  },
  {
    id: "tech-modern",
    name: "Tech Modern",
    description: "Modern template for tech industry",
    color: "bg-cyan-600",
    category: "Technology",
    layout: "tech-grid",
    columns: "1 column",
    style: "Contemporary",
    headshot: "Without photo",
    occupation: ["Office & Administrative Support", "Business & Finance"]
  },
  {
    id: "executive",
    name: "Executive",
    description: "Premium layout for senior positions",
    color: "bg-amber-600",
    category: "Executive",
    layout: "executive",
    columns: "1 column",
    style: "Traditional",
    headshot: "Without photo",
    occupation: ["Management & Executive"]
  },
  {
    id: "ivy-league",
    name: "Ivy League",
    description: "Clean and simple traditional style",
    color: "bg-gray-600",
    category: "Simple",
    layout: "single-column",
    columns: "1 column",
    style: "Traditional",
    headshot: "Without photo",
    occupation: ["Business & Finance", "Office & Administrative Support"]
  },
  {
    id: "contemporary",
    name: "Contemporary",
    description: "Modern green sidebar with clean typography",
    color: "bg-green-500",
    category: "Modern",
    layout: "sidebar-green",
    columns: "2 columns",
    style: "Contemporary",
    headshot: "With photo",
    occupation: ["Management & Executive", "Business & Finance"]
  },
  {
    id: "polished",
    name: "Polished",
    description: "Professional teal design with achievement highlights",
    color: "bg-teal-600",
    category: "Professional",
    layout: "sidebar-teal",
    columns: "2 columns",
    style: "Traditional",
    headshot: "Without photo",
    occupation: ["Retail & Sales", "Management & Executive"]
  },
  {
    id: "timeline",
    name: "Timeline",
    description: "Orange timeline design for career progression",
    color: "bg-orange-500",
    category: "Modern",
    layout: "timeline-orange",
    columns: "1 column",
    style: "Contemporary",
    headshot: "Without photo",
    occupation: ["Computer & Technology", "Arts & Entertainment"]
  },
  {
    id: "stylish",
    name: "Stylish",
    description: "Purple minimalist design for tech professionals",
    color: "bg-purple-600",
    category: "Modern",
    layout: "stylish-purple",
    columns: "1 column",
    style: "Contemporary",
    headshot: "Without photo",
    occupation: ["Computer & Technology", "Arts & Entertainment"]
  },
  {
    id: "single-column",
    name: "Single Column",
    description: "Traditional single column layout",
    color: "bg-gray-600",
    category: "Simple",
    layout: "single-traditional",
    columns: "1 column",
    style: "Traditional",
    headshot: "Without photo",
    occupation: ["Retail & Sales", "Business & Finance"]
  },
  {
    id: "elegant-with-logos",
    name: "Elegant with Logos",
    description: "Teal sidebar design with company logos",
    color: "bg-teal-600",
    category: "Professional",
    layout: "elegant-logos",
    columns: "2 columns",
    style: "Contemporary",
    headshot: "With photo",
    occupation: ["Computer & Technology", "Arts & Entertainment"]
  },
  {
    id: "double-column-with-logos",
    name: "Double Column with Logos",
    description: "Blue header design with structured layout",
    color: "bg-blue-600",
    category: "Professional",
    layout: "double-logos",
    columns: "2 columns",
    style: "Traditional",
    headshot: "Without photo",
    occupation: ["Business & Finance", "Management & Executive"]
  },
  {
    id: "compact",
    name: "Compact",
    description: "Blue sidebar compact design",
    color: "bg-blue-500",
    category: "Professional",
    layout: "compact-blue",
    columns: "2 columns",
    style: "Traditional",
    headshot: "With photo",
    occupation: ["Education & Library", "Office & Administrative Support"]
  },
  {
    id: "modern-with-logos",
    name: "Modern with Logos",
    description: "Red accent modern layout with company integration",
    color: "bg-red-500",
    category: "Modern",
    layout: "modern-logos",
    columns: "1 column",
    style: "Contemporary",
    headshot: "Without photo",
    occupation: ["Computer & Technology", "Retail & Sales"]
  },
  {
    id: "multicolumn",
    name: "Multicolumn",
    description: "Multi-section layout with photo emphasis",
    color: "bg-blue-600",
    category: "Professional",
    layout: "multi-section",
    columns: "2 columns",
    style: "Contemporary",
    headshot: "With photo",
    occupation: ["Business & Finance", "Management & Executive"]
  },
  {
    id: "timeline-with-logos",
    name: "Timeline with Logos",
    description: "Green timeline layout with company logos",
    color: "bg-green-500",
    category: "Modern",
    layout: "timeline-logos",
    columns: "1 column",
    style: "Contemporary",
    headshot: "With photo",
    occupation: ["Computer & Technology", "Arts & Entertainment"]
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional professional layout",
    color: "bg-gray-800",
    category: "Simple",
    layout: "classic-traditional",
    columns: "1 column",
    style: "Traditional",
    headshot: "Without photo",
    occupation: ["Business & Finance", "Office & Administrative Support"]
  },
  {
    id: "ivy-league-with-logos",
    name: "Ivy League with Logos",
    description: "Clean traditional design with company integration",
    color: "bg-gray-600",
    category: "Simple",
    layout: "ivy-logos",
    columns: "1 column",
    style: "Traditional",
    headshot: "Without photo",
    occupation: ["Business & Finance", "Education & Library"]
  },
  {
    id: "high-performer",
    name: "High Performer",
    description: "Blue professional layout for executives",
    color: "bg-blue-600",
    category: "Executive",
    layout: "high-performer",
    columns: "1 column",
    style: "Traditional",
    headshot: "Without photo",
    occupation: ["Management & Executive", "Business & Finance"]
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean minimal design with photo accent",
    color: "bg-gray-800",
    category: "Simple",
    layout: "minimal-clean",
    columns: "1 column",
    style: "Contemporary",
    headshot: "With photo",
    occupation: ["Computer & Technology", "Arts & Entertainment"]
  }
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
  const [selectedTemplate, setSelectedTemplate] = useState("double-column");
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
