
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Plus, Trash2, FileText, Save, Download, User, Briefcase, 
  Award, Calendar, Mail, Phone, Globe, MapPin, Linkedin
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
    if (resumeData.experience.length <= 1) {
      toast({
        title: "Cannot remove",
        description: "You must have at least one experience entry.",
        variant: "destructive",
      });
      return;
    }
    
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
    if (resumeData.education.length <= 1) {
      toast({
        title: "Cannot remove",
        description: "You must have at least one education entry.",
        variant: "destructive",
      });
      return;
    }
    
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
  
  const removeSkill = (id: string) => {
    if (resumeData.skills.length <= 1) {
      toast({
        title: "Cannot remove",
        description: "You must have at least one skill entry.",
        variant: "destructive",
      });
      return;
    }
    
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((skill) => skill.id !== id),
    });
  };
  
  const handleSaveResume = () => {
    // In a real implementation, this would save the resume to the backend
    toast({
      title: "Resume saved",
      description: "Your resume has been saved successfully.",
    });
  };
  
  const handleDownloadResume = () => {
    // In a real implementation, this would generate a PDF and download it
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
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 mb-4">
                          <User className="h-5 w-5 text-primary-600" />
                          <h2 className="text-xl font-medium text-gray-900">Personal Information</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              name="name"
                              value={resumeData.personalInfo.name}
                              onChange={handlePersonalInfoChange}
                              placeholder="John Doe"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="title">Professional Title</Label>
                            <Input
                              id="title"
                              name="title"
                              value={resumeData.personalInfo.title}
                              onChange={handlePersonalInfoChange}
                              placeholder="Software Developer"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={resumeData.personalInfo.email}
                              onChange={handlePersonalInfoChange}
                              placeholder="john.doe@example.com"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={resumeData.personalInfo.phone}
                              onChange={handlePersonalInfoChange}
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              name="location"
                              value={resumeData.personalInfo.location}
                              onChange={handlePersonalInfoChange}
                              placeholder="New York, NY"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="website">Website (Optional)</Label>
                            <Input
                              id="website"
                              name="website"
                              value={resumeData.personalInfo.website}
                              onChange={handlePersonalInfoChange}
                              placeholder="https://johndoe.com"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
                            <Input
                              id="linkedin"
                              name="linkedin"
                              value={resumeData.personalInfo.linkedin}
                              onChange={handlePersonalInfoChange}
                              placeholder="https://linkedin.com/in/johndoe"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="experience">
                  <div className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <Card key={exp.id}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-2">
                              <Briefcase className="h-5 w-5 text-primary-600" />
                              <h2 className="text-xl font-medium text-gray-900">
                                Experience {index + 1}
                              </h2>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeExperience(exp.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`${exp.id}-title`}>Job Title</Label>
                              <Input
                                id={`${exp.id}-title`}
                                value={exp.title}
                                onChange={(e) => handleExperienceChange(exp.id, "title", e.target.value)}
                                placeholder="Software Developer"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`${exp.id}-company`}>Company</Label>
                              <Input
                                id={`${exp.id}-company`}
                                value={exp.company}
                                onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                                placeholder="ABC Company"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`${exp.id}-location`}>Location</Label>
                              <Input
                                id={`${exp.id}-location`}
                                value={exp.location}
                                onChange={(e) => handleExperienceChange(exp.id, "location", e.target.value)}
                                placeholder="New York, NY"
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`${exp.id}-startDate`}>Start Date</Label>
                                <Input
                                  id={`${exp.id}-startDate`}
                                  value={exp.startDate}
                                  onChange={(e) => handleExperienceChange(exp.id, "startDate", e.target.value)}
                                  placeholder="Jan 2020"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor={`${exp.id}-endDate`}>End Date</Label>
                                <Input
                                  id={`${exp.id}-endDate`}
                                  value={exp.endDate}
                                  onChange={(e) => handleExperienceChange(exp.id, "endDate", e.target.value)}
                                  placeholder="Present"
                                />
                              </div>
                            </div>
                            
                            <div className="md:col-span-2 space-y-2">
                              <Label htmlFor={`${exp.id}-description`}>Description</Label>
                              <Textarea
                                id={`${exp.id}-description`}
                                value={exp.description}
                                onChange={(e) => handleExperienceChange(exp.id, "description", e.target.value)}
                                placeholder="Describe your responsibilities and achievements in this role..."
                                className="min-h-[150px]"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <Button onClick={addExperience} variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Another Experience
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="education">
                  <div className="space-y-6">
                    {resumeData.education.map((edu, index) => (
                      <Card key={edu.id}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-2">
                              <Award className="h-5 w-5 text-primary-600" />
                              <h2 className="text-xl font-medium text-gray-900">
                                Education {index + 1}
                              </h2>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeEducation(edu.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`${edu.id}-degree`}>Degree</Label>
                              <Input
                                id={`${edu.id}-degree`}
                                value={edu.degree}
                                onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                                placeholder="Bachelor of Science in Computer Science"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`${edu.id}-school`}>School</Label>
                              <Input
                                id={`${edu.id}-school`}
                                value={edu.school}
                                onChange={(e) => handleEducationChange(edu.id, "school", e.target.value)}
                                placeholder="University of Example"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`${edu.id}-location`}>Location</Label>
                              <Input
                                id={`${edu.id}-location`}
                                value={edu.location}
                                onChange={(e) => handleEducationChange(edu.id, "location", e.target.value)}
                                placeholder="Boston, MA"
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`${edu.id}-startDate`}>Start Date</Label>
                                <Input
                                  id={`${edu.id}-startDate`}
                                  value={edu.startDate}
                                  onChange={(e) => handleEducationChange(edu.id, "startDate", e.target.value)}
                                  placeholder="Sep 2016"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor={`${edu.id}-endDate`}>End Date</Label>
                                <Input
                                  id={`${edu.id}-endDate`}
                                  value={edu.endDate}
                                  onChange={(e) => handleEducationChange(edu.id, "endDate", e.target.value)}
                                  placeholder="May 2020"
                                />
                              </div>
                            </div>
                            
                            <div className="md:col-span-2 space-y-2">
                              <Label htmlFor={`${edu.id}-description`}>Description (Optional)</Label>
                              <Textarea
                                id={`${edu.id}-description`}
                                value={edu.description}
                                onChange={(e) => handleEducationChange(edu.id, "description", e.target.value)}
                                placeholder="Relevant coursework, achievements, or activities..."
                                className="min-h-[100px]"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <Button onClick={addEducation} variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Another Education
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="skills">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div className="flex items-center space-x-2 mb-4">
                          <Award className="h-5 w-5 text-primary-600" />
                          <h2 className="text-xl font-medium text-gray-900">Skills</h2>
                        </div>
                        
                        <div className="space-y-4">
                          {resumeData.skills.map((skill) => (
                            <div key={skill.id} className="flex items-center space-x-2">
                              <Input
                                value={skill.name}
                                onChange={(e) => handleSkillChange(skill.id, e.target.value)}
                                placeholder="e.g., JavaScript, Project Management, UX Design"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeSkill(skill.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          
                          <Button onClick={addSkill} variant="outline" className="w-full">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Another Skill
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
              <div className="sticky top-28">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Resume Preview</h2>
                
                <div className="p-4 bg-gray-100 rounded-lg mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Template</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={`cursor-pointer rounded-md border-2 p-2 ${
                          selectedTemplate === template.id
                            ? "border-primary-600"
                            : "border-gray-200"
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <div className={`w-full h-4 rounded ${template.color} mb-2`}></div>
                        <div className="text-xs font-medium text-gray-900 truncate">
                          {template.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                  <div className="bg-primary-600 px-6 py-4 text-white">
                    <h3 className="text-lg font-bold">
                      {resumeData.personalInfo.name || "Your Name"}
                    </h3>
                    <p>{resumeData.personalInfo.title || "Professional Title"}</p>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    {/* Contact Info */}
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      {resumeData.personalInfo.email && (
                        <div className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          <span className="text-xs">{resumeData.personalInfo.email}</span>
                        </div>
                      )}
                      {resumeData.personalInfo.phone && (
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          <span className="text-xs">{resumeData.personalInfo.phone}</span>
                        </div>
                      )}
                      {resumeData.personalInfo.location && (
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="text-xs">{resumeData.personalInfo.location}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Experience */}
                    {resumeData.experience.some((exp) => exp.title || exp.company) && (
                      <div>
                        <h4 className="text-sm font-bold border-b border-gray-200 pb-1 mb-2">
                          EXPERIENCE
                        </h4>
                        <div className="space-y-3">
                          {resumeData.experience.map((exp) => (
                            (exp.title || exp.company) && (
                              <div key={exp.id} className="text-xs">
                                <div className="flex justify-between">
                                  <div>
                                    <p className="font-semibold">{exp.title || "Position"}</p>
                                    <p>{exp.company || "Company"}{exp.location ? `, ${exp.location}` : ""}</p>
                                  </div>
                                  <div className="text-gray-500">
                                    {exp.startDate ? exp.startDate : "Start"} - {exp.endDate ? exp.endDate : "End"}
                                  </div>
                                </div>
                                {exp.description && (
                                  <p className="mt-1 text-gray-600 text-[10px] line-clamp-2">
                                    {exp.description}
                                  </p>
                                )}
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Education */}
                    {resumeData.education.some((edu) => edu.degree || edu.school) && (
                      <div>
                        <h4 className="text-sm font-bold border-b border-gray-200 pb-1 mb-2">
                          EDUCATION
                        </h4>
                        <div className="space-y-3">
                          {resumeData.education.map((edu) => (
                            (edu.degree || edu.school) && (
                              <div key={edu.id} className="text-xs">
                                <div className="flex justify-between">
                                  <div>
                                    <p className="font-semibold">{edu.degree || "Degree"}</p>
                                    <p>{edu.school || "School"}{edu.location ? `, ${edu.location}` : ""}</p>
                                  </div>
                                  <div className="text-gray-500">
                                    {edu.startDate ? edu.startDate : "Start"} - {edu.endDate ? edu.endDate : "End"}
                                  </div>
                                </div>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Skills */}
                    {resumeData.skills.some((skill) => skill.name) && (
                      <div>
                        <h4 className="text-sm font-bold border-b border-gray-200 pb-1 mb-2">
                          SKILLS
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {resumeData.skills.map((skill) => (
                            skill.name && (
                              <span
                                key={skill.id}
                                className="text-xs bg-gray-100 px-2 py-1 rounded"
                              >
                                {skill.name}
                              </span>
                            )
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Placeholder content when empty */}
                    {!resumeData.experience.some((exp) => exp.title || exp.company) && 
                     !resumeData.education.some((edu) => edu.degree || edu.school) && 
                     !resumeData.skills.some((skill) => skill.name) && (
                      <div className="text-center py-6 text-gray-400">
                        <FileText className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm">Complete the form to preview your resume</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 text-center text-xs text-gray-500">
                  This is a simplified preview. Download the PDF to see the full resume.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Builder;
