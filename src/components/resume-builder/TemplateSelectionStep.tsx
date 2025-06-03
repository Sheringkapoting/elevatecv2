
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import TemplatePreviewModal from "./TemplatePreviewModal";

interface Template {
  id: string;
  name: string;
  description: string;
  color: string;
  category: string;
  imageUrl?: string;
}

interface TemplateSelectionStepProps {
  templates: Template[];
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  onContinue: () => void;
}

// Full resume preview components for each template with realistic layouts
const FullResumePreview = ({ template }: { template: Template }) => {
  const getPreviewContent = () => {
    switch (template.id) {
      case "professional":
        return (
          <div className="bg-white text-black text-xs p-6 h-full min-h-[500px] shadow-lg">
            <div className="border-b-4 border-blue-600 pb-4 mb-6">
              <h1 className="text-2xl font-bold">ALEXANDER TAYLOR</h1>
              <p className="text-lg text-gray-600">Senior Project Manager | Tech UI Implementation</p>
              <p className="text-sm text-gray-500">alexander@email.com | (555) 123-4567 | LinkedIn: linkedin.com/in/alexander-taylor</p>
            </div>
            
            <div className="space-y-5">
              <section>
                <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">PROFESSIONAL SUMMARY</h2>
                <p className="text-sm text-gray-700">
                  Experienced project manager with 8+ years in tech industry, specializing in UI/UX implementation 
                  and cross-functional team leadership. Proven track record of delivering complex projects on time 
                  and within budget while maintaining high quality standards.
                </p>
              </section>
              
              <section>
                <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">PROFESSIONAL EXPERIENCE</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">Senior Project Manager</h3>
                        <p className="text-gray-600">Tech Solutions Inc. | San Francisco, CA</p>
                      </div>
                      <span className="text-sm text-gray-500">2020 - Present</span>
                    </div>
                    <ul className="mt-2 text-sm text-gray-700 list-disc list-inside space-y-1">
                      <li>Led cross-functional teams of 12+ developers and designers</li>
                      <li>Implemented agile methodologies resulting in 30% faster delivery</li>
                      <li>Managed $2M+ project budgets with 98% success rate</li>
                    </ul>
                  </div>
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">Project Manager</h3>
                        <p className="text-gray-600">Digital Innovations | Palo Alto, CA</p>
                      </div>
                      <span className="text-sm text-gray-500">2017 - 2020</span>
                    </div>
                    <ul className="mt-2 text-sm text-gray-700 list-disc list-inside space-y-1">
                      <li>Coordinated product launches for 5+ major clients</li>
                      <li>Reduced project timeline by 25% through process optimization</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">EDUCATION</h2>
                <div>
                  <h3 className="font-semibold">Master of Business Administration</h3>
                  <p className="text-gray-600">Stanford University | Stanford, CA | 2018</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">SKILLS</h2>
                <div className="flex flex-wrap gap-2">
                  {["Project Management", "Agile/Scrum", "Team Leadership", "Budget Management", "Risk Assessment"].map((skill) => (
                    <span key={skill} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{skill}</span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        );

      case "modern":
        return (
          <div className="bg-white text-black text-xs p-6 h-full min-h-[500px] shadow-lg">
            <div className="text-center mb-6 pb-4 border-b-2 border-indigo-500">
              <h1 className="text-2xl font-bold text-indigo-700">ABIGAIL HALL</h1>
              <p className="text-lg text-gray-600">Marketing Specialist</p>
              <p className="text-sm text-gray-500">abigail@email.com | (555) 987-6543 | New York, NY</p>
            </div>
            
            <div className="space-y-5">
              <section className="text-center">
                <h2 className="text-lg font-bold mb-3 text-indigo-600">PROFESSIONAL SUMMARY</h2>
                <p className="text-sm text-gray-700">
                  Creative marketing professional with expertise in digital campaigns, brand development, 
                  and social media strategy. Passionate about creating engaging content that drives results.
                </p>
              </section>
              
              <section>
                <h2 className="text-lg font-bold mb-3 text-center text-indigo-600">EXPERIENCE</h2>
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="font-semibold">Marketing Specialist</h3>
                    <p className="text-gray-600">Digital Agency | 2019 - Present</p>
                    <p className="text-sm text-gray-700 mt-1">Increased client engagement by 45% through innovative social media campaigns</p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold">Marketing Coordinator</h3>
                    <p className="text-gray-600">Creative Studio | 2017 - 2019</p>
                    <p className="text-sm text-gray-700 mt-1">Managed brand identity projects for 20+ clients</p>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-lg font-bold mb-3 text-center text-indigo-600">EDUCATION</h2>
                <div className="text-center">
                  <h3 className="font-semibold">Bachelor of Marketing</h3>
                  <p className="text-gray-600">New York University | 2017</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-lg font-bold mb-3 text-center text-indigo-600">SKILLS</h2>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Digital Marketing", "Social Media", "Content Creation", "Analytics", "Brand Strategy"].map((skill) => (
                    <span key={skill} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm">{skill}</span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        );

      case "minimal":
        return (
          <div className="bg-white text-black text-xs p-6 h-full min-h-[500px] shadow-lg">
            <div className="mb-6">
              <h1 className="text-3xl font-light mb-2">AIDEN WILLIAMS</h1>
              <p className="text-lg text-gray-600 mb-1">Software Developer</p>
              <p className="text-sm text-gray-500">aiden@email.com | (555) 456-7890 | San Francisco, CA</p>
            </div>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-lg font-light mb-3 uppercase tracking-wide border-b border-gray-200 pb-1">Experience</h2>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Software Developer</h3>
                        <p className="text-gray-600">Tech Corp</p>
                      </div>
                      <p className="text-gray-500">2021 - Present</p>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">Developed scalable web applications using React and Node.js</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Junior Developer</h3>
                        <p className="text-gray-600">StartupXYZ</p>
                      </div>
                      <p className="text-gray-500">2019 - 2021</p>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">Built responsive user interfaces and API integrations</p>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-lg font-light mb-3 uppercase tracking-wide border-b border-gray-200 pb-1">Education</h2>
                <div>
                  <h3 className="font-medium">Bachelor of Computer Science</h3>
                  <p className="text-gray-600">University of California | 2019</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-lg font-light mb-3 uppercase tracking-wide border-b border-gray-200 pb-1">Skills</h2>
                <p className="text-sm text-gray-700">JavaScript, React, Node.js, Python, SQL, Git, Docker</p>
              </section>
            </div>
          </div>
        );

      case "creative":
        return (
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white text-xs p-6 h-full min-h-[500px] shadow-lg">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">MAYA CHEN</h1>
              <p className="text-xl opacity-90 mb-1">UI/UX Designer</p>
              <p className="text-sm opacity-80">maya@email.com | (555) 321-0987 | Portfolio: mayachen.design</p>
            </div>
            
            <div className="space-y-5">
              <section>
                <h2 className="text-xl font-bold mb-3">ABOUT ME</h2>
                <p className="opacity-90">
                  Creative designer passionate about user experience and visual storytelling. 
                  Specialized in creating intuitive digital experiences that bridge the gap 
                  between user needs and business objectives.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-bold mb-3">EXPERIENCE</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">Senior UI/UX Designer</h3>
                        <p className="opacity-80">Design Studio | New York, NY</p>
                      </div>
                      <span className="text-sm opacity-70">2020 - Present</span>
                    </div>
                    <ul className="mt-2 opacity-90 list-disc list-inside space-y-1">
                      <li>Designed user interfaces for 25+ mobile and web applications</li>
                      <li>Increased user engagement by 45% through UX optimization</li>
                      <li>Led design thinking workshops for cross-functional teams</li>
                    </ul>
                  </div>
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">UX Designer</h3>
                        <p className="opacity-80">Tech Startup | San Francisco, CA</p>
                      </div>
                      <span className="text-sm opacity-70">2018 - 2020</span>
                    </div>
                    <ul className="mt-2 opacity-90 list-disc list-inside space-y-1">
                      <li>Created wireframes and prototypes for mobile app</li>
                      <li>Conducted user research and usability testing</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-bold mb-3">EDUCATION</h2>
                <div>
                  <h3 className="font-semibold">Master of Fine Arts in Design</h3>
                  <p className="opacity-80">Parsons School of Design | 2018</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-bold mb-3">SKILLS</h2>
                <div className="flex flex-wrap gap-2">
                  {["Figma", "Sketch", "Adobe Creative Suite", "Prototyping", "User Research", "Design Systems"].map((skill) => (
                    <span key={skill} className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">{skill}</span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        );

      case "executive":
        return (
          <div className="bg-white text-black text-xs p-6 h-full min-h-[500px] shadow-lg border-l-8 border-emerald-600">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-emerald-700 mb-1">MAEVE DELANCY</h1>
              <p className="text-lg text-gray-600 mb-1">Executive Operating Officer | Operations Management</p>
              <p className="text-sm text-gray-500">maeve@email.com | (555) 654-3210 | Boston, MA</p>
            </div>
            
            <div className="space-y-5">
              <section>
                <h2 className="text-lg font-bold text-emerald-700 mb-3">EXECUTIVE SUMMARY</h2>
                <p className="text-sm text-gray-700">
                  Strategic executive with 15+ years of leadership experience in operations management, 
                  business transformation, and organizational development. Proven track record of driving 
                  revenue growth and operational efficiency across Fortune 500 companies.
                </p>
              </section>
              
              <section>
                <h2 className="text-lg font-bold text-emerald-700 mb-3">PROFESSIONAL EXPERIENCE</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">Chief Operating Officer</h3>
                        <p className="text-gray-600">Global Corp | Boston, MA</p>
                      </div>
                      <span className="text-sm text-gray-500">2018 - Present</span>
                    </div>
                    <ul className="mt-2 text-sm text-gray-700 list-disc list-inside space-y-1">
                      <li>Led digital transformation initiative resulting in $50M cost savings</li>
                      <li>Managed operations across 12 countries with 2,000+ employees</li>
                      <li>Improved operational efficiency by 35% through process optimization</li>
                    </ul>
                  </div>
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">VP of Operations</h3>
                        <p className="text-gray-600">Enterprise Solutions | New York, NY</p>
                      </div>
                      <span className="text-sm text-gray-500">2014 - 2018</span>
                    </div>
                    <ul className="mt-2 text-sm text-gray-700 list-disc list-inside space-y-1">
                      <li>Scaled operations from $100M to $500M in annual revenue</li>
                      <li>Built and led high-performing operations team of 150+ professionals</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-lg font-bold text-emerald-700 mb-3">EDUCATION</h2>
                <div>
                  <h3 className="font-semibold">MBA in Operations Management</h3>
                  <p className="text-gray-600">Harvard Business School | 2014</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-lg font-bold text-emerald-700 mb-3">CORE COMPETENCIES</h2>
                <div className="grid grid-cols-2 gap-2">
                  {["Strategic Planning", "Operations Management", "Digital Transformation", "Team Leadership", "P&L Management", "Process Optimization"].map((skill) => (
                    <span key={skill} className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-sm">{skill}</span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        );

      case "tech":
        return (
          <div className="bg-gray-900 text-white text-xs p-6 h-full min-h-[500px] shadow-lg">
            <div className="mb-6 border-b border-blue-400 pb-4">
              <h1 className="text-2xl font-bold text-blue-400 mb-1">GRACE JACKSON</h1>
              <p className="text-lg mb-1">Senior Software Engineer | Full-Stack Development</p>
              <p className="text-sm opacity-80">grace@email.com | (555) 789-0123 | GitHub: github.com/gracejackson</p>
            </div>
            
            <div className="space-y-5">
              <section>
                <h2 className="text-lg font-bold text-blue-400 mb-3">TECHNICAL SUMMARY</h2>
                <p className="text-sm opacity-90">
                  Full-stack developer with expertise in modern frameworks and cloud technologies. 
                  Passionate about building scalable applications and mentoring junior developers. 
                  Strong background in microservices architecture and DevOps practices.
                </p>
              </section>
              
              <section>
                <h2 className="text-lg font-bold text-blue-400 mb-3">PROFESSIONAL EXPERIENCE</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">Senior Software Engineer</h3>
                        <p className="opacity-80">Tech Innovations | Seattle, WA</p>
                      </div>
                      <span className="text-sm opacity-70">2019 - Present</span>
                    </div>
                    <ul className="mt-2 text-sm opacity-90 list-disc list-inside space-y-1">
                      <li>Architected microservices handling 10M+ daily requests</li>
                      <li>Led migration to cloud infrastructure reducing costs by 40%</li>
                      <li>Mentored team of 6 junior developers</li>
                    </ul>
                  </div>
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">Software Engineer</h3>
                        <p className="opacity-80">Digital Solutions | Portland, OR</p>
                      </div>
                      <span className="text-sm opacity-70">2017 - 2019</span>
                    </div>
                    <ul className="mt-2 text-sm opacity-90 list-disc list-inside space-y-1">
                      <li>Developed RESTful APIs serving 50+ client applications</li>
                      <li>Implemented CI/CD pipelines improving deployment speed by 60%</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-lg font-bold text-blue-400 mb-3">TECHNICAL SKILLS</h2>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <h4 className="font-semibold text-blue-300 mb-1">Languages</h4>
                    <p className="text-sm opacity-90">JavaScript, Python, Go, TypeScript</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-300 mb-1">Frameworks</h4>
                    <p className="text-sm opacity-90">React, Node.js, Django, Express</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-300 mb-1">Cloud & Tools</h4>
                    <p className="text-sm opacity-90">AWS, Docker, Kubernetes, Redis</p>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-lg font-bold text-blue-400 mb-3">EDUCATION</h2>
                <div>
                  <h3 className="font-semibold">Bachelor of Computer Science</h3>
                  <p className="opacity-80">University of Washington | 2017</p>
                </div>
              </section>
            </div>
          </div>
        );

      case "elegant":
        return (
          <div className="bg-white text-black text-xs p-6 h-full min-h-[500px] shadow-lg">
            <div className="text-center mb-6 pb-4 border-b-2 border-purple-300">
              <h1 className="text-2xl font-bold tracking-wide text-purple-700 mb-1">SOPHIA RODRIGUEZ</h1>
              <p className="text-lg text-gray-600 italic mb-1">Business Analyst | Strategic Planning</p>
              <p className="text-sm text-gray-500">sophia@email.com | (555) 246-8135 | Chicago, IL</p>
            </div>
            
            <div className="space-y-5">
              <section>
                <h2 className="text-lg font-bold mb-3 text-center text-purple-600">PROFESSIONAL SUMMARY</h2>
                <p className="text-sm text-gray-700 text-center">
                  Results-driven business analyst with 6+ years of experience in strategic planning, 
                  data analysis, and process improvement. Proven ability to translate complex business 
                  requirements into actionable insights and drive organizational growth.
                </p>
              </section>
              
              <section>
                <h2 className="text-lg font-bold mb-3 text-center text-purple-600">PROFESSIONAL EXPERIENCE</h2>
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="font-semibold">Senior Business Analyst</h3>
                    <p className="text-gray-600">Fortune 500 Company | Chicago, IL</p>
                    <p className="text-sm text-gray-500 mb-1">2021 - Present</p>
                    <p className="text-sm text-gray-700">Led strategic initiatives resulting in $10M cost reduction and 25% efficiency improvement</p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold">Business Analyst</h3>
                    <p className="text-gray-600">Consulting Firm | Milwaukee, WI</p>
                    <p className="text-sm text-gray-500 mb-1">2018 - 2021</p>
                    <p className="text-sm text-gray-700">Analyzed market trends and developed business intelligence reports for C-level executives</p>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-lg font-bold mb-3 text-center text-purple-600">EDUCATION</h2>
                <div className="text-center">
                  <h3 className="font-semibold">Master of Business Administration</h3>
                  <p className="text-gray-600">Northwestern University | 2018</p>
                  <p className="text-sm text-gray-500">Concentration: Strategic Management</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-lg font-bold mb-3 text-center text-purple-600">CORE COMPETENCIES</h2>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Strategic Analysis", "Data Visualization", "Process Improvement", "Financial Modeling", "Stakeholder Management", "Project Leadership"].map((skill) => (
                    <span key={skill} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">{skill}</span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        );

      case "contemporary":
        return (
          <div className="bg-white text-black text-xs h-full min-h-[500px] shadow-lg">
            {/* Double column layout */}
            <div className="flex h-full">
              {/* Left sidebar */}
              <div className="w-1/3 bg-orange-500 text-white p-4">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-white rounded-full mx-auto mb-3 flex items-center justify-center text-orange-500 font-bold text-xl">
                    JD
                  </div>
                  <h1 className="text-xl font-bold">JORDAN DAVIS</h1>
                  <p className="text-sm opacity-90">Product Manager</p>
                </div>
                
                <div className="space-y-4">
                  <section>
                    <h3 className="font-bold mb-2 text-sm">CONTACT</h3>
                    <div className="space-y-1 text-xs">
                      <p>jordan@email.com</p>
                      <p>(555) 135-7924</p>
                      <p>San Francisco, CA</p>
                      <p>linkedin.com/in/jordandavis</p>
                    </div>
                  </section>
                  
                  <section>
                    <h3 className="font-bold mb-2 text-sm">SKILLS</h3>
                    <div className="space-y-1 text-xs">
                      {["Product Strategy", "Agile Development", "User Research", "Data Analysis", "Roadmap Planning"].map((skill) => (
                        <div key={skill} className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">{skill}</div>
                      ))}
                    </div>
                  </section>
                  
                  <section>
                    <h3 className="font-bold mb-2 text-sm">EDUCATION</h3>
                    <div className="text-xs">
                      <p className="font-semibold">MBA in Technology Management</p>
                      <p className="opacity-90">Stanford University</p>
                      <p className="opacity-80">2019</p>
                    </div>
                  </section>
                </div>
              </div>
              
              {/* Right main content */}
              <div className="w-2/3 p-4">
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-orange-600 mb-2">ABOUT ME</h2>
                  <p className="text-sm text-gray-700">
                    Innovative product manager driving digital transformation through data-driven decisions 
                    and user-centric design. Passionate about building products that solve real-world problems 
                    and create meaningful impact for users and businesses.
                  </p>
                </div>
                
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-orange-600 mb-2">WORK EXPERIENCE</h2>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">Senior Product Manager</h3>
                          <p className="text-gray-600 text-sm">StartupXYZ | San Francisco, CA</p>
                        </div>
                        <span className="text-xs text-gray-500">2020 - Present</span>
                      </div>
                      <ul className="mt-1 text-xs text-gray-700 list-disc list-inside space-y-1">
                        <li>Led product development for mobile app with 500K+ users</li>
                        <li>Increased user retention by 35% through feature optimization</li>
                        <li>Collaborated with engineering teams to deliver 15+ feature releases</li>
                      </ul>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">Product Manager</h3>
                          <p className="text-gray-600 text-sm">Tech Corp | Palo Alto, CA</p>
                        </div>
                        <span className="text-xs text-gray-500">2018 - 2020</span>
                      </div>
                      <ul className="mt-1 text-xs text-gray-700 list-disc list-inside space-y-1">
                        <li>Managed product roadmap for B2B SaaS platform</li>
                        <li>Conducted user research and competitive analysis</li>
                        <li>Worked with cross-functional teams of 12+ members</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-bold text-orange-600 mb-2">ACHIEVEMENTS</h2>
                  <ul className="text-xs text-gray-700 list-disc list-inside space-y-1">
                    <li>Product of the Year Award - TechCrunch Disrupt 2022</li>
                    <li>Led team that achieved 120% of quarterly revenue targets</li>
                    <li>Featured speaker at ProductCon 2023</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className={`${template.color} text-white text-xs p-4 h-full flex items-center justify-center`}>
            <span className="font-semibold">{template.name} Preview</span>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-[500px] border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
      {getPreviewContent()}
    </div>
  );
};

const TemplateSelectionStep = ({ 
  templates, 
  selectedTemplate, 
  onTemplateSelect, 
  onContinue 
}: TemplateSelectionStepProps) => {
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const handleTemplatePreview = (template: Template) => {
    setPreviewTemplate(template);
    setPreviewModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Resume Template</h2>
        <p className="text-xl text-gray-600">
          Select a professional template that best represents your style. You can always change it later.
        </p>
      </div>

      <RadioGroup 
        value={selectedTemplate} 
        onValueChange={onTemplateSelect}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
      >
        {templates.map((template) => (
          <div key={template.id} className="relative">
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-primary-400 ${
                selectedTemplate === template.id 
                  ? 'ring-2 ring-primary-500 shadow-xl border-primary-500 scale-[1.02]' 
                  : 'hover:shadow-lg border-gray-200'
              }`}
              onClick={() => onTemplateSelect(template.id)}
            >
              <CardContent className="p-2">
                <div className="relative">
                  <FullResumePreview template={template} />
                  
                  {/* Radio button indicator */}
                  <div className="absolute top-3 left-3 z-10">
                    <RadioGroupItem
                      value={template.id}
                      id={template.id}
                      className={`w-5 h-5 shadow-lg ${
                        selectedTemplate === template.id 
                          ? 'border-primary-600 bg-primary-600' 
                          : 'border-gray-300 bg-white'
                      }`}
                    />
                  </div>

                  {/* Selected indicator */}
                  {selectedTemplate === template.id && (
                    <div className="absolute top-1 right-1 z-10 animate-scale-in">
                      <CheckCircle className="h-6 w-6 text-primary-600 bg-white rounded-full shadow-md" />
                    </div>
                  )}

                  {/* Preview button overlay */}
                  <div 
                    className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100 rounded-lg z-20"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTemplatePreview(template);
                    }}
                  >
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg"
                    >
                      Full Preview
                    </Button>
                  </div>
                </div>
                
                <div className="mt-3 text-center px-2">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{template.name}</h3>
                  <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                    {template.category}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </RadioGroup>

      <div className="text-center">
        <Button 
          onClick={onContinue}
          disabled={!selectedTemplate}
          size="lg"
          className="px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
        >
          Continue with {templates.find(t => t.id === selectedTemplate)?.name || 'Selected'} Template
        </Button>
      </div>

      {/* Template Preview Modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          isOpen={previewModalOpen}
          onClose={() => setPreviewModalOpen(false)}
          onSelect={() => {
            onTemplateSelect(previewTemplate.id);
            setPreviewModalOpen(false);
          }}
          isSelected={selectedTemplate === previewTemplate.id}
        />
      )}
    </div>
  );
};

export default TemplateSelectionStep;
