
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
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

const Builder = () => {
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const { toast } = useToast();
  
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Resume Builder</h1>
            <p className="mt-4 text-xl text-gray-500">
              Create a professional resume tailored to your target job
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="personal">
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
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
              
              <div className="mt-8 flex justify-end space-x-4">
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Builder;
