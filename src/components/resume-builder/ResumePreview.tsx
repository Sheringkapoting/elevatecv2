
import { FileText, Mail, Phone, MapPin } from "lucide-react";
import ResumeTemplatesGallery from "./ResumeTemplatesGallery";

interface Template {
  id: string;
  name: string;
  description: string;
  color: string;
  imageUrl?: string;
}

interface PreviewProps {
  resumeData: {
    personalInfo: {
      name: string;
      title: string;
      email: string;
      phone: string;
      location: string;
    };
    experience: Array<{
      id: string;
      title: string;
      company: string;
      location: string;
      startDate: string;
      endDate: string;
      description: string;
    }>;
    education: Array<{
      id: string;
      degree: string;
      school: string;
      location: string;
      startDate: string;
      endDate: string;
    }>;
    skills: Array<{
      id: string;
      name: string;
    }>;
  };
  templates: Template[];
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

const ResumePreview = ({
  resumeData,
  templates,
  selectedTemplate,
  onTemplateSelect,
}: PreviewProps) => {
  return (
    <div className="sticky top-28">
      <h2 className="text-xl font-medium text-gray-900 mb-4">Resume Preview</h2>
      
      <ResumeTemplatesGallery 
        templates={templates} 
        selectedTemplate={selectedTemplate} 
        onTemplateSelect={onTemplateSelect} 
      />
      
      <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden mt-6">
        <div className={`px-6 py-4 text-white ${templates.find(t => t.id === selectedTemplate)?.color}`}>
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
  );
};

export default ResumePreview;
