
import React from "react";

interface Template {
  id: string;
  name: string;
  description: string;
  color: string;
  category: string;
  layout: string;
}

// Template preview components for each template
export const DoubleColumnPreview = () => (
  <div className="bg-white text-black text-[8px] h-full min-h-[400px] shadow-lg flex">
    <div className="w-1/3 bg-blue-50 p-3 border-r-2 border-blue-200">
      <div className="text-center mb-3">
        <div className="w-12 h-12 bg-blue-200 rounded-full mx-auto mb-2 flex items-center justify-center text-blue-700 font-bold text-sm">
          JS
        </div>
        <h1 className="text-sm font-bold text-blue-800">JOHN SMITH</h1>
        <p className="text-xs text-blue-600">Software Engineer</p>
      </div>
      
      <div className="space-y-3">
        <section>
          <h3 className="font-bold mb-1 text-blue-800 text-xs">CONTACT</h3>
          <div className="space-y-1 text-xs text-gray-700">
            <p>john@email.com</p>
            <p>(555) 123-4567</p>
            <p>San Francisco, CA</p>
          </div>
        </section>
        
        <section>
          <h3 className="font-bold mb-1 text-blue-800 text-xs">SKILLS</h3>
          <div className="space-y-1">
            {["JavaScript", "React", "Node.js"].map((skill) => (
              <div key={skill} className="bg-blue-100 px-1 py-0.5 rounded text-xs text-blue-800">{skill}</div>
            ))}
          </div>
        </section>
      </div>
    </div>
    
    <div className="w-2/3 p-3">
      <div className="mb-3">
        <h2 className="text-xs font-bold text-blue-800 mb-1">EXPERIENCE</h2>
        <div>
          <h3 className="font-semibold text-xs">Senior Software Engineer</h3>
          <p className="text-gray-600 text-xs">Tech Corp | 2021 - Present</p>
          <p className="text-xs text-gray-700 mt-1">Led development of microservices architecture</p>
        </div>
      </div>
    </div>
  </div>
);

export const ElegantPreview = () => (
  <div className="bg-white text-black text-[8px] h-full min-h-[400px] shadow-lg flex">
    <div className="w-1/3 bg-gray-900 text-white p-3">
      <div className="text-center mb-3">
        <div className="w-12 h-12 bg-purple-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm">
          SJ
        </div>
        <h1 className="text-sm font-bold">SARAH JOHNSON</h1>
        <p className="text-xs text-purple-300">UX Designer</p>
      </div>
      
      <div className="space-y-3">
        <section>
          <h3 className="font-bold mb-1 text-purple-400 text-xs">CONTACT</h3>
          <div className="space-y-1 text-xs">
            <p>sarah@email.com</p>
            <p>(555) 987-6543</p>
            <p>New York, NY</p>
          </div>
        </section>
        
        <section>
          <h3 className="font-bold mb-1 text-purple-400 text-xs">SKILLS</h3>
          <div className="space-y-1">
            {["Figma", "Sketch", "Adobe XD"].map((skill) => (
              <div key={skill} className="bg-purple-800 px-1 py-0.5 rounded text-xs">{skill}</div>
            ))}
          </div>
        </section>
      </div>
    </div>
    
    <div className="w-2/3 p-3">
      <div className="mb-3">
        <h1 className="text-lg font-bold text-gray-900 mb-1">SARAH JOHNSON</h1>
        <p className="text-xs text-purple-600 mb-1">UX Designer</p>
        <p className="text-xs text-gray-700">Creative UX designer with passion for user-centered design</p>
      </div>
      
      <div className="mb-3">
        <h2 className="text-xs font-bold text-purple-600 mb-1">EXPERIENCE</h2>
        <div>
          <h3 className="font-semibold text-xs">Senior UX Designer</h3>
          <p className="text-gray-600 text-xs">Design Studio | 2022 - Present</p>
        </div>
      </div>
    </div>
  </div>
);

export const MinimalistPreview = () => (
  <div className="bg-white text-black text-[8px] p-4 h-full min-h-[400px] shadow-lg">
    <div className="text-center mb-4 pb-3 border-b border-gray-200">
      <h1 className="text-lg font-light mb-1">MICHAEL CHEN</h1>
      <p className="text-xs text-gray-600">Data Scientist</p>
      <p className="text-xs text-gray-500">michael@email.com | (555) 246-8135</p>
    </div>
    
    <div className="space-y-3">
      <section>
        <h2 className="text-xs font-light mb-2 uppercase tracking-wide border-b border-gray-200 pb-1">Experience</h2>
        <div>
          <h3 className="font-medium text-xs">Senior Data Scientist</h3>
          <p className="text-gray-600 text-xs">Tech Giants Inc. | 2021 - Present</p>
          <p className="text-xs text-gray-700 mt-1">Built ML models that increased revenue by $2M</p>
        </div>
      </section>
      
      <section>
        <h2 className="text-xs font-light mb-2 uppercase tracking-wide border-b border-gray-200 pb-1">Skills</h2>
        <p className="text-xs text-gray-700">Python, R, SQL, Machine Learning</p>
      </section>
    </div>
  </div>
);

export const ModernAccentPreview = () => (
  <div className="bg-white text-black text-[8px] h-full min-h-[400px] shadow-lg">
    <div className="bg-emerald-600 text-white p-3 mb-3">
      <h1 className="text-lg font-bold">EMMA RODRIGUEZ</h1>
      <p className="text-xs opacity-90">Marketing Manager</p>
      <p className="text-xs opacity-80">emma@email.com | (555) 789-0123</p>
    </div>
    
    <div className="px-3 space-y-3">
      <section>
        <h2 className="text-xs font-bold text-emerald-600 mb-2 flex items-center">
          <div className="w-2 h-2 bg-emerald-600 rounded-full mr-1"></div>
          EXPERIENCE
        </h2>
        <div>
          <h3 className="font-semibold text-xs">Marketing Manager</h3>
          <p className="text-gray-600 text-xs">Digital Agency | 2020 - Present</p>
          <p className="text-xs text-gray-700">Increased brand awareness by 150%</p>
        </div>
      </section>
      
      <div className="grid grid-cols-2 gap-2">
        <section>
          <h2 className="text-xs font-bold text-emerald-600 mb-1">SKILLS</h2>
          <div className="flex flex-wrap gap-1">
            {["SEO", "Analytics"].map((skill) => (
              <span key={skill} className="bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded text-xs">{skill}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
);

export const CorporatePreview = () => (
  <div className="bg-white text-black text-[8px] p-4 h-full min-h-[400px] shadow-lg">
    <div className="text-center mb-4 pb-3 border-b-2 border-indigo-600">
      <h1 className="text-lg font-bold text-indigo-700">ROBERT WILLIAMS</h1>
      <p className="text-xs text-gray-600">Business Analyst</p>
      <p className="text-xs text-gray-500">robert@email.com | (555) 321-9876</p>
    </div>
    
    <div className="space-y-3">
      <section>
        <h2 className="text-xs font-bold text-indigo-700 mb-2 border-b border-indigo-200 pb-1">EXPERIENCE</h2>
        <div>
          <h3 className="font-semibold text-xs">Senior Business Analyst</h3>
          <p className="text-gray-600 text-xs">Financial Corp | 2019 - Present</p>
          <p className="text-xs text-gray-700">Led process improvement initiatives</p>
        </div>
      </section>
      
      <div className="grid grid-cols-2 gap-3">
        <section>
          <h2 className="text-xs font-bold text-indigo-700 mb-1">EDUCATION</h2>
          <div>
            <h3 className="font-semibold text-xs">MBA</h3>
            <p className="text-gray-600 text-xs">Northwestern University</p>
          </div>
        </section>
        
        <section>
          <h2 className="text-xs font-bold text-indigo-700 mb-1">SKILLS</h2>
          <p className="text-xs text-gray-700">Strategic Analysis, Financial Modeling</p>
        </section>
      </div>
    </div>
  </div>
);

export const CreativePortfolioPreview = () => (
  <div className="bg-white text-black text-[8px] h-full min-h-[400px] shadow-lg relative overflow-hidden">
    <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white p-3 mb-3">
      <h1 className="text-lg font-bold">ALEX DESIGN</h1>
      <p className="text-xs opacity-90">Creative Director</p>
    </div>
    
    <div className="px-3 space-y-3">
      <section>
        <h2 className="text-xs font-bold text-rose-600 mb-2">CREATIVE EXPERIENCE</h2>
        <div>
          <h3 className="font-semibold text-xs">Creative Director</h3>
          <p className="text-gray-600 text-xs">Design Agency | 2020 - Present</p>
          <p className="text-xs text-gray-700">Led creative campaigns for Fortune 500 clients</p>
        </div>
      </section>
      
      <section>
        <h2 className="text-xs font-bold text-rose-600 mb-1">PORTFOLIO</h2>
        <div className="grid grid-cols-3 gap-1">
          <div className="bg-rose-100 h-8 rounded"></div>
          <div className="bg-pink-100 h-8 rounded"></div>
          <div className="bg-purple-100 h-8 rounded"></div>
        </div>
      </section>
    </div>
    
    <div className="absolute bottom-2 right-2 bg-rose-600 text-white px-2 py-1 rounded text-xs font-bold">
      RECOMMENDED
    </div>
  </div>
);

export const TechModernPreview = () => (
  <div className="bg-white text-black text-[8px] h-full min-h-[400px] shadow-lg">
    <div className="bg-gray-100 p-3 mb-3 border-l-4 border-cyan-600">
      <h1 className="text-lg font-bold text-gray-900">DAVID TECH</h1>
      <p className="text-xs text-cyan-600 font-semibold">Full Stack Developer</p>
      <p className="text-xs text-gray-500">david@email.com | github.com/davidtech</p>
    </div>
    
    <div className="px-3 space-y-3">
      <section>
        <h2 className="text-xs font-bold text-cyan-600 mb-2 flex items-center">
          <div className="w-1 h-4 bg-cyan-600 mr-2"></div>
          TECHNICAL EXPERIENCE
        </h2>
        <div>
          <h3 className="font-semibold text-xs">Senior Full Stack Developer</h3>
          <p className="text-gray-600 text-xs">TechCorp | 2021 - Present</p>
          <p className="text-xs text-gray-700">Built scalable microservices with React & Node.js</p>
        </div>
      </section>
      
      <section>
        <h2 className="text-xs font-bold text-cyan-600 mb-1">TECH STACK</h2>
        <div className="grid grid-cols-4 gap-1">
          {["React", "Node.js", "Python", "AWS"].map((tech) => (
            <div key={tech} className="bg-cyan-100 text-cyan-800 px-1 py-1 rounded text-xs text-center">{tech}</div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

export const ExecutivePreview = () => (
  <div className="bg-white text-black text-[8px] p-4 h-full min-h-[400px] shadow-lg border-t-4 border-amber-600">
    <div className="text-center mb-4">
      <h1 className="text-xl font-bold text-gray-900">JENNIFER EXECUTIVE</h1>
      <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide">Chief Executive Officer</p>
      <p className="text-xs text-gray-500">jennifer@email.com | (555) 999-8888 | New York, NY</p>
    </div>
    
    <div className="space-y-3">
      <section>
        <h2 className="text-xs font-bold text-amber-600 mb-2 uppercase tracking-wide">EXECUTIVE SUMMARY</h2>
        <p className="text-xs text-gray-700">Visionary leader with 20+ years of executive experience</p>
      </section>
      
      <section>
        <h2 className="text-xs font-bold text-amber-600 mb-2 uppercase tracking-wide">LEADERSHIP EXPERIENCE</h2>
        <div>
          <h3 className="font-semibold text-xs">Chief Executive Officer</h3>
          <p className="text-gray-600 text-xs">Global Corp | 2018 - Present</p>
          <p className="text-xs text-gray-700">Led company through 300% revenue growth</p>
        </div>
      </section>
      
      <div className="grid grid-cols-2 gap-3">
        <section>
          <h2 className="text-xs font-bold text-amber-600 mb-1">BOARD POSITIONS</h2>
          <p className="text-xs text-gray-700">Tech Foundation Board Member</p>
        </section>
        
        <section>
          <h2 className="text-xs font-bold text-amber-600 mb-1">AWARDS</h2>
          <p className="text-xs text-gray-700">CEO of the Year 2023</p>
        </section>
      </div>
    </div>
  </div>
);

// Template preview component mapper
export const getTemplatePreview = (templateId: string) => {
  switch (templateId) {
    case "double-column":
      return <DoubleColumnPreview />;
    case "elegant":
      return <ElegantPreview />;
    case "minimalist":
      return <MinimalistPreview />;
    case "modern-accent":
      return <ModernAccentPreview />;
    case "corporate":
      return <CorporatePreview />;
    case "creative-portfolio":
      return <CreativePortfolioPreview />;
    case "tech-modern":
      return <TechModernPreview />;
    case "executive":
      return <ExecutivePreview />;
    default:
      return <DoubleColumnPreview />;
  }
};
