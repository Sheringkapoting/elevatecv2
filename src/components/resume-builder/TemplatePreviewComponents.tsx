
import React from "react";

interface Template {
  id: string;
  name: string;
  description: string;
  color: string;
  category: string;
  layout: string;
}

// Double Column Template (First image, left)
export const DoubleColumnPreview = () => (
  <div className="bg-white text-black text-[8px] h-full min-h-[400px] shadow-lg flex">
    <div className="w-1/3 bg-teal-500 text-white p-3">
      <div className="text-center mb-3">
        <h1 className="text-sm font-bold">ALEXANDER TAYLOR</h1>
        <p className="text-xs opacity-90">Senior Product Manager | Early Life Implementation</p>
        <p className="text-xs opacity-80 mt-1">alexander@email.com | (555) 123-4567</p>
      </div>
      
      <div className="space-y-4">
        <section>
          <h3 className="font-bold mb-2 text-xs">SUMMARY</h3>
          <p className="text-xs opacity-90">Senior product manager with 8+ years of experience driving digital transformation initiatives.</p>
        </section>
        
        <section>
          <h3 className="font-bold mb-2 text-xs">KEY ACHIEVEMENTS</h3>
          <ul className="text-xs space-y-1 opacity-90">
            <li>• Led team project implementation</li>
            <li>• Increased efficiency by 40%</li>
            <li>• Managed $2M+ budgets</li>
          </ul>
        </section>
        
        <section>
          <h3 className="font-bold mb-2 text-xs">SKILLS</h3>
          <div className="space-y-1">
            {["Project Management", "Agile/Scrum", "Team Leadership"].map((skill) => (
              <div key={skill} className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">{skill}</div>
            ))}
          </div>
        </section>
      </div>
    </div>
    
    <div className="w-2/3 p-3">
      <div className="mb-3">
        <h2 className="text-xs font-bold text-teal-600 mb-2">EXPERIENCE</h2>
        <div>
          <h3 className="font-semibold text-xs">Senior Product Manager</h3>
          <p className="text-gray-600 text-xs">Boston Scientific | Boston, MA | 2020 - Present</p>
          <ul className="text-xs text-gray-700 mt-1 list-disc list-inside space-y-1">
            <li>Led cross-functional teams of 12+ developers</li>
            <li>Implemented agile methodologies</li>
            <li>Delivered projects 30% faster than industry standard</li>
          </ul>
        </div>
      </div>
      
      <div className="mb-3">
        <h2 className="text-xs font-bold text-teal-600 mb-2">EDUCATION</h2>
        <div>
          <h3 className="font-semibold text-xs">Master of Business Administration</h3>
          <p className="text-gray-600 text-xs">Stanford University | 2018</p>
        </div>
      </div>
    </div>
  </div>
);

// Ivy League Template (First image, second)
export const IvyLeaguePreview = () => (
  <div className="bg-white text-black text-[8px] p-4 h-full min-h-[400px] shadow-lg">
    <div className="text-center mb-4 pb-3 border-b border-gray-300">
      <h1 className="text-lg font-light mb-1">ABIGAIL HALL</h1>
      <p className="text-xs text-gray-600">Senior Business Analyst | Data Analytics Expert</p>
      <p className="text-xs text-gray-500">abigail@email.com | (555) 234-5678 | New York, NY</p>
    </div>
    
    <div className="space-y-3">
      <section>
        <h2 className="text-xs font-bold mb-2 uppercase tracking-wide">KEY ACHIEVEMENTS</h2>
        <ul className="text-xs text-gray-700 list-disc list-inside space-y-1">
          <li>Led large project implementations</li>
          <li>Increased operational efficiency by 35%</li>
          <li>Managed cross-functional teams</li>
        </ul>
      </section>
      
      <section>
        <h2 className="text-xs font-bold mb-2 uppercase tracking-wide">EXPERIENCE</h2>
        <div>
          <h3 className="font-semibold text-xs">Senior Business Analyst</h3>
          <p className="text-gray-600 text-xs">Data Analytics Corp | San Francisco, CA | 2019 - Present</p>
          <p className="text-xs text-gray-700 mt-1">Specialized in data analytics and business intelligence solutions</p>
        </div>
      </section>
      
      <section>
        <h2 className="text-xs font-bold mb-2 uppercase tracking-wide">EDUCATION</h2>
        <div>
          <h3 className="font-semibold text-xs">Master of Business Administration</h3>
          <p className="text-gray-600 text-xs">Harvard Business School | 2017</p>
        </div>
      </section>
    </div>
  </div>
);

// Elegant Template (First image, third)
export const ElegantPreview = () => (
  <div className="bg-white text-black text-[8px] h-full min-h-[400px] shadow-lg flex">
    <div className="w-1/3 bg-slate-700 text-white p-3">
      <div className="text-center mb-3">
        <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2 overflow-hidden">
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-lg font-bold">
            AW
          </div>
        </div>
        <h1 className="text-sm font-bold">AIDEN WILLIAMS</h1>
        <p className="text-xs opacity-90">Senior Project Manager | Timeline & Expense Management</p>
      </div>
      
      <div className="space-y-3">
        <section>
          <h3 className="font-bold mb-2 text-xs">SUMMARY</h3>
          <p className="text-xs opacity-90">Experienced project manager with proven track record in timeline and expense management.</p>
        </section>
        
        <section>
          <h3 className="font-bold mb-2 text-xs">KEY ACHIEVEMENTS</h3>
          <ul className="text-xs space-y-1 opacity-90">
            <li>• Delivered 50+ projects on time</li>
            <li>• Reduced costs by 25%</li>
            <li>• Led teams of 15+ members</li>
          </ul>
        </section>
      </div>
    </div>
    
    <div className="w-2/3 p-3">
      <div className="mb-3">
        <h2 className="text-xs font-bold text-slate-700 mb-2">EXPERIENCE</h2>
        <div>
          <h3 className="font-semibold text-xs">Senior Project Manager</h3>
          <p className="text-gray-600 text-xs">Tech Solutions Inc. | Austin, TX | 2020 - Present</p>
          <ul className="text-xs text-gray-700 mt-1 list-disc list-inside space-y-1">
            <li>Managed complex project timelines and budgets</li>
            <li>Coordinated with cross-functional teams</li>
            <li>Implemented cost-saving initiatives</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// Contemporary Template (First image, fourth)
export const ContemporaryPreview = () => (
  <div className="bg-white text-black text-[8px] h-full min-h-[400px] shadow-lg">
    <div className="flex">
      <div className="w-1/3 bg-green-500 text-white p-3">
        <div className="text-center mb-3">
          <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2 flex items-center justify-center text-green-500 font-bold">
            MD
          </div>
          <h1 className="text-sm font-bold">MAEVE DELANEY</h1>
          <p className="text-xs opacity-90">Enterprise Sourcing Leader | Process Improvement Specialist</p>
        </div>
        
        <div className="space-y-3">
          <section>
            <h3 className="font-bold mb-2 text-xs">CONTACTS</h3>
            <div className="text-xs space-y-1">
              <p>maeve@email.com</p>
              <p>(555) 345-6789</p>
              <p>Chicago, IL</p>
            </div>
          </section>
          
          <section>
            <h3 className="font-bold mb-2 text-xs">KEY ACHIEVEMENTS</h3>
            <ul className="text-xs space-y-1">
              <li>• Implemented cost-saving initiatives</li>
              <li>• Led process improvement projects</li>
              <li>• Managed supplier relationships</li>
            </ul>
          </section>
        </div>
      </div>
      
      <div className="w-2/3 p-3">
        <div className="mb-3">
          <h2 className="text-xs font-bold text-green-600 mb-2">SUMMARY</h2>
          <p className="text-xs text-gray-700">Dynamic sourcing leader with extensive experience in process improvement and supplier management.</p>
        </div>
        
        <div className="mb-3">
          <h2 className="text-xs font-bold text-green-600 mb-2">EXPERIENCE</h2>
          <div>
            <h3 className="font-semibold text-xs">Enterprise Sourcing Leader</h3>
            <p className="text-gray-600 text-xs">Global Corp | Chicago, IL | 2019 - Present</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Polished Template (Second image, first)
export const PolishedPreview = () => (
  <div className="bg-white text-black text-[8px] h-full min-h-[400px] shadow-lg flex">
    <div className="w-1/3 bg-teal-600 text-white p-3">
      <div className="mb-4">
        <h1 className="text-sm font-bold">JASON REED</h1>
        <p className="text-xs opacity-90">Sales Rep Owner | Marketing | Strategic Leadership</p>
      </div>
      
      <div className="space-y-3">
        <section>
          <h3 className="font-bold mb-2 text-xs">KEY ACHIEVEMENTS</h3>
          <ul className="text-xs space-y-1">
            <li>✓ Led 20+ strategic initiatives</li>
            <li>✓ Increased revenue by 40%</li>
            <li>✓ Built high-performing teams</li>
          </ul>
        </section>
        
        <section>
          <h3 className="font-bold mb-2 text-xs">CERTIFICATION</h3>
          <p className="text-xs">Strategic Marketing Professional</p>
        </section>
        
        <section>
          <h3 className="font-bold mb-2 text-xs">LANGUAGES</h3>
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span>English</span>
              <span>★★★★★</span>
            </div>
            <div className="flex justify-between">
              <span>Spanish</span>
              <span>★★★★☆</span>
            </div>
          </div>
        </section>
      </div>
    </div>
    
    <div className="w-2/3 p-3">
      <div className="mb-3">
        <h2 className="text-xs font-bold text-teal-600 mb-2">SUMMARY</h2>
        <p className="text-xs text-gray-700">Results-driven sales professional with proven track record in strategic marketing and team leadership.</p>
      </div>
      
      <div className="mb-3">
        <h2 className="text-xs font-bold text-teal-600 mb-2">EXPERIENCE</h2>
        <div>
          <h3 className="font-semibold text-xs">Vice President, Sales</h3>
          <p className="text-gray-600 text-xs">SalesForce | San Francisco, CA | 2020 - Present</p>
        </div>
      </div>
    </div>
  </div>
);

// Modern Template (Second image, second)
export const ModernPreview = () => (
  <div className="bg-white text-black text-[8px] p-4 h-full min-h-[400px] shadow-lg">
    <div className="text-center mb-4 pb-3 border-b-2 border-blue-500">
      <h1 className="text-lg font-bold text-blue-600">ELLEN JOHNSON</h1>
      <p className="text-xs text-gray-600">Digital Marketing Manager | Growth Hacking | Data Analytics</p>
      <p className="text-xs text-gray-500">ellen@email.com | (555) 456-7890 | Portland, OR</p>
    </div>
    
    <div className="space-y-3">
      <section>
        <h2 className="text-xs font-bold text-blue-600 mb-2">SUMMARY</h2>
        <p className="text-xs text-gray-700">Multi-year digital marketing manager with a track record of driving growth through data-driven strategies.</p>
      </section>
      
      <section>
        <h2 className="text-xs font-bold text-blue-600 mb-2">EXPERIENCE</h2>
        <div>
          <h3 className="font-semibold text-xs">Digital Marketing Manager</h3>
          <p className="text-gray-600 text-xs">TechStart | Portland, OR | 2019 - Present</p>
          <ul className="text-xs text-gray-700 mt-1 list-disc list-inside space-y-1">
            <li>Developed comprehensive digital marketing strategies</li>
            <li>Increased online engagement by 65%</li>
            <li>Led data analytics initiatives</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
);

// Creative Template (Second image, third)
export const CreativePreview = () => (
  <div className="bg-white text-black text-[8px] h-full min-h-[400px] shadow-lg flex">
    <div className="w-1/3 bg-slate-800 text-white p-3">
      <div className="text-center mb-3">
        <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2 overflow-hidden">
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-lg font-bold">
            BH
          </div>
        </div>
        <h1 className="text-sm font-bold">BRANDON HALE</h1>
        <p className="text-xs opacity-90">Senior Business Development Director</p>
      </div>
      
      <div className="space-y-3">
        <section>
          <h3 className="font-bold mb-2 text-xs">SUMMARY</h3>
          <p className="text-xs opacity-90">Strategic business development leader with expertise in biotech and pharma industries.</p>
        </section>
        
        <section>
          <h3 className="font-bold mb-2 text-xs">KEY ACHIEVEMENTS</h3>
          <ul className="text-xs space-y-1">
            <li>• Secured $50M+ in partnerships</li>
            <li>• Led strategic initiatives</li>
            <li>• Built executive relationships</li>
          </ul>
        </section>
      </div>
    </div>
    
    <div className="w-2/3 p-3">
      <div className="mb-3">
        <h2 className="text-xs font-bold text-slate-800 mb-2">EXPERIENCE</h2>
        <div>
          <h3 className="font-semibold text-xs">Senior Business Development Director</h3>
          <p className="text-gray-600 text-xs">BioTech Solutions | Boston, MA | 2018 - Present</p>
        </div>
      </div>
    </div>
  </div>
);

// Timeline Template (Second image, fourth)
export const TimelinePreview = () => (
  <div className="bg-white text-black text-[8px] p-4 h-full min-h-[400px] shadow-lg">
    <div className="text-center mb-4 pb-3 border-b border-orange-400">
      <h1 className="text-lg font-bold text-orange-600">GRACE JACKSON</h1>
      <p className="text-xs text-gray-600">Data Scientist | Advanced Analytics | Machine Learning</p>
      <p className="text-xs text-gray-500">grace@email.com | (555) 567-8901</p>
    </div>
    
    <div className="space-y-3">
      <section>
        <h2 className="text-xs font-bold text-orange-600 mb-2">SUMMARY</h2>
        <p className="text-xs text-gray-700">Experienced data scientist specializing in advanced analytics and machine learning solutions.</p>
      </section>
      
      <section>
        <h2 className="text-xs font-bold text-orange-600 mb-2">EXPERIENCE</h2>
        <div className="relative">
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-orange-400"></div>
          <div className="relative pl-6">
            <div className="absolute left-0 top-1 w-2 h-2 bg-orange-500 rounded-full"></div>
            <h3 className="font-semibold text-xs">Senior Data Scientist</h3>
            <p className="text-gray-600 text-xs">Analytics Corp | 2020 - Present</p>
          </div>
        </div>
      </section>
    </div>
  </div>
);

// Additional templates from remaining images...
export const StylishPreview = () => (
  <div className="bg-white text-black text-[8px] p-4 h-full min-h-[400px] shadow-lg">
    <div className="mb-4">
      <h1 className="text-lg font-light text-purple-600">VIOLET RODRIGUEZ</h1>
      <p className="text-xs text-gray-600">Sr Software Engineer | Blockchain Development | Cloud Solutions</p>
    </div>
    
    <div className="space-y-3">
      <section>
        <h2 className="text-xs font-bold text-purple-600 mb-2 uppercase">SKILLS</h2>
        <div className="grid grid-cols-3 gap-1 text-xs">
          <span>Python</span>
          <span>JavaScript</span>
          <span>React</span>
          <span>Blockchain</span>
          <span>AWS</span>
          <span>Docker</span>
        </div>
      </section>
    </div>
  </div>
);

export const SingleColumnPreview = () => (
  <div className="bg-white text-black text-[8px] p-4 h-full min-h-[400px] shadow-lg">
    <div className="text-center mb-4 pb-3 border-b border-gray-300">
      <h1 className="text-lg font-bold">MASON TURNER</h1>
      <p className="text-xs text-gray-600">Experienced Sales Professional | B2B | Networking</p>
    </div>
    
    <div className="space-y-3">
      <section>
        <h2 className="text-xs font-bold mb-2">SUMMARY</h2>
        <p className="text-xs text-gray-700">Results-oriented sales professional with proven track record in B2B sales and client relationship management.</p>
      </section>
      
      <section>
        <h2 className="text-xs font-bold mb-2">EXPERIENCE</h2>
        <div>
          <h3 className="font-semibold text-xs">Senior Account Executive</h3>
          <p className="text-gray-600 text-xs">SalesForce | 2019 - Present</p>
        </div>
      </section>
    </div>
  </div>
);

export const ElegantWithLogosPreview = () => (
  <div className="bg-white text-black text-[8px] h-full min-h-[400px] shadow-lg flex">
    <div className="w-1/3 bg-teal-600 text-white p-3">
      <div className="text-center mb-3">
        <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2 overflow-hidden">
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-lg font-bold">
            JN
          </div>
        </div>
        <h1 className="text-sm font-bold">JOSHUA NELSON</h1>
        <p className="text-xs opacity-90">UI/UX Designer | Product Manager</p>
      </div>
      
      <div className="space-y-3">
        <section>
          <h3 className="font-bold mb-2 text-xs">KEY ACHIEVEMENTS</h3>
          <ul className="text-xs space-y-1">
            <li>• Led design systems implementation</li>
            <li>• Improved user satisfaction by 40%</li>
            <li>• Managed product roadmaps</li>
          </ul>
        </section>
      </div>
    </div>
    
    <div className="w-2/3 p-3">
      <div className="mb-3">
        <h2 className="text-xs font-bold text-teal-600 mb-2">EXPERIENCE</h2>
        <div>
          <h3 className="font-semibold text-xs">Senior UI/UX Designer</h3>
          <p className="text-gray-600 text-xs">Design Studio | Seattle, WA | 2020 - Present</p>
        </div>
      </div>
    </div>
  </div>
);

export const DoubleColumnWithLogosPreview = () => (
  <div className="bg-white text-black text-[8px] h-full min-h-[400px] shadow-lg">
    <div className="text-center mb-4 pb-3 border-b-2 border-blue-500">
      <h1 className="text-lg font-bold text-blue-600">PAYTON WEBSTER</h1>
      <p className="text-xs text-gray-600">Investment Banking Associate | Technology M&A | Financial Analytics</p>
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h2 className="text-xs font-bold text-blue-600 mb-2">EXPERIENCE</h2>
        <div>
          <h3 className="font-semibold text-xs">Investment Banking Associate</h3>
          <p className="text-gray-600 text-xs">Goldman Sachs | New York, NY</p>
        </div>
      </div>
      
      <div>
        <h2 className="text-xs font-bold text-blue-600 mb-2">SKILLS</h2>
        <div className="flex flex-wrap gap-1">
          {["Financial Modeling", "M&A", "Valuation"].map((skill) => (
            <span key={skill} className="bg-blue-100 text-blue-800 px-1 py-0.5 rounded text-xs">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Compact, Modern with Logos, Multicolumn, Timeline with Logos templates...
export const CompactPreview = () => (
  <div className="bg-white text-black text-[8px] h-full min-h-[400px] shadow-lg flex">
    <div className="w-1/3 bg-blue-500 text-white p-3">
      <div className="text-center mb-3">
        <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2 overflow-hidden">
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-lg font-bold">
            IA
          </div>
        </div>
        <h1 className="text-sm font-bold">ISABELLA ADAMS</h1>
        <p className="text-xs opacity-90">Senior Data Scientist | Consultant | Specialized | Finance Services</p>
      </div>
    </div>
    
    <div className="w-2/3 p-3">
      <div className="mb-3">
        <h2 className="text-xs font-bold text-blue-600 mb-2">EXPERIENCE</h2>
        <div>
          <h3 className="font-semibold text-xs">Senior Curriculum Coordinator</h3>
          <p className="text-gray-600 text-xs">Education Corp | 2019 - Present</p>
        </div>
      </div>
    </div>
  </div>
);

export const ModernWithLogosPreview = () => (
  <div className="bg-white text-black text-[8px] p-4 h-full min-h-[400px] shadow-lg">
    <div className="text-center mb-4 pb-3 border-b-2 border-red-500">
      <h1 className="text-lg font-bold">ELLEN JOHNSON</h1>
      <p className="text-xs text-gray-600">Digital Marketing Manager | Growth Hacking | Data Analytics</p>
    </div>
    
    <div className="space-y-3">
      <section>
        <h2 className="text-xs font-bold text-red-600 mb-2">SUMMARY</h2>
        <p className="text-xs text-gray-700">Multi-year digital marketing manager with expertise in growth hacking and data analytics.</p>
      </section>
    </div>
  </div>
);

export const MulticolumnPreview = () => (
  <div className="bg-white text-black text-[8px] h-full min-h-[400px] shadow-lg flex">
    <div className="w-1/3 bg-gray-100 p-3">
      <div className="text-center mb-3">
        <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-2 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center text-white text-lg font-bold">
            LA
          </div>
        </div>
        <h1 className="text-sm font-bold text-gray-800">LUKE ADAMS</h1>
        <p className="text-xs text-gray-600">Senior Sales Executive | CPA | Strategies | Client Acquisition</p>
      </div>
    </div>
    
    <div className="w-2/3 p-3">
      <div className="mb-3">
        <h2 className="text-xs font-bold text-blue-600 mb-2">EXPERIENCE</h2>
        <div>
          <h3 className="font-semibold text-xs">Senior Sales Executive</h3>
          <p className="text-gray-600 text-xs">Sales Corp | 2020 - Present</p>
        </div>
      </div>
    </div>
  </div>
);

export const TimelineWithLogosPreview = () => (
  <div className="bg-white text-black text-[8px] p-4 h-full min-h-[400px] shadow-lg">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h1 className="text-lg font-bold">GRACE JACKSON</h1>
        <p className="text-xs text-gray-600">Data Scientist | Advanced Analytics | Machine Learning</p>
      </div>
      <div className="w-12 h-12 bg-green-500 rounded-full overflow-hidden">
        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-bold">
          GJ
        </div>
      </div>
    </div>
    
    <div className="space-y-3">
      <section>
        <h2 className="text-xs font-bold text-green-600 mb-2">EXPERIENCE</h2>
        <div className="relative">
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-green-400"></div>
          <div className="relative pl-6">
            <div className="absolute left-0 top-1 w-2 h-2 bg-green-500 rounded-full"></div>
            <h3 className="font-semibold text-xs">Senior Data Scientist</h3>
            <p className="text-gray-600 text-xs">Analytics Corp | 2020 - Present</p>
          </div>
        </div>
      </section>
    </div>
  </div>
);

// Last set of templates from final image
export const ClassicPreview = () => (
  <div className="bg-white text-black text-[8px] p-4 h-full min-h-[400px] shadow-lg">
    <div className="mb-4">
      <h1 className="text-lg font-bold">SCARLETT ANDERSON</h1>
      <p className="text-xs text-gray-600">Certified Public Accountant | Financial Analysis | Auditing</p>
    </div>
    
    <div className="space-y-3">
      <section>
        <h2 className="text-xs font-bold mb-2">SUMMARY</h2>
        <p className="text-xs text-gray-700">Experienced CPA with 8+ years of expertise in financial analysis and auditing practices.</p>
      </section>
      
      <section>
        <h2 className="text-xs font-bold mb-2">EXPERIENCE</h2>
        <div>
          <h3 className="font-semibold text-xs">Senior Auditor</h3>
          <p className="text-gray-600 text-xs">KPMG | San Francisco, CA | 2019 - Present</p>
        </div>
      </section>
    </div>
  </div>
);

export const IvyLeagueWithLogosPreview = () => (
  <div className="bg-white text-black text-[8px] p-4 h-full min-h-[400px] shadow-lg">
    <div className="text-center mb-4 pb-3 border-b border-gray-300">
      <h1 className="text-lg font-light mb-1">ABIGAIL HALL</h1>
      <p className="text-xs text-gray-600">Senior Business Analyst | Data Analytics Expert</p>
    </div>
    
    <div className="space-y-3">
      <section>
        <h2 className="text-xs font-bold mb-2 uppercase tracking-wide">EXPERIENCE</h2>
        <div>
          <h3 className="font-semibold text-xs">Senior Business Analyst</h3>
          <p className="text-gray-600 text-xs">Data Analytics Corp | 2019 - Present</p>
        </div>
      </section>
    </div>
  </div>
);

export const HighPerformerPreview = () => (
  <div className="bg-white text-black text-[8px] p-4 h-full min-h-[400px] shadow-lg">
    <div className="mb-4">
      <h1 className="text-lg font-bold text-blue-600">ISAAC HALL</h1>
      <p className="text-xs text-gray-600">Senior Product Manager | Product Strategy | Growth</p>
    </div>
    
    <div className="space-y-3">
      <section>
        <h2 className="text-xs font-bold text-blue-600 mb-2">SUMMARY</h2>
        <p className="text-xs text-gray-700">Strategic product manager with proven track record in driving product growth and market expansion.</p>
      </section>
      
      <section>
        <h2 className="text-xs font-bold text-blue-600 mb-2">EXPERIENCE</h2>
        <div>
          <h3 className="font-semibold text-xs">Senior Product Manager</h3>
          <p className="text-gray-600 text-xs">TechCorp | San Francisco, CA | 2020 - Present</p>
        </div>
      </section>
    </div>
  </div>
);

export const MinimalPreview = () => (
  <div className="bg-white text-black text-[8px] p-4 h-full min-h-[400px] shadow-lg">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h1 className="text-lg font-light">ELISE CARTER</h1>
        <p className="text-xs text-gray-600">Senior Business Software Engineer | Python, C++</p>
      </div>
      <div className="w-12 h-12 bg-gray-800 rounded-full overflow-hidden">
        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-bold">
          EC
        </div>
      </div>
    </div>
    
    <div className="space-y-3">
      <section>
        <h2 className="text-xs font-light mb-2 uppercase tracking-wide border-b border-gray-200 pb-1">SUMMARY</h2>
        <p className="text-xs text-gray-700">Senior software engineer specializing in Python and C++ development with focus on scalable solutions.</p>
      </section>
      
      <section>
        <h2 className="text-xs font-light mb-2 uppercase tracking-wide border-b border-gray-200 pb-1">EXPERIENCE</h2>
        <div>
          <h3 className="font-medium text-xs">Senior Software Engineer</h3>
          <p className="text-gray-600 text-xs">Microsoft | Seattle, WA | 2020 - Present</p>
        </div>
      </section>
    </div>
  </div>
);

// Update existing previews to use the new names
export const MinimalistPreview = MinimalPreview;
export const ModernAccentPreview = ModernPreview;
export const CorporatePreview = ClassicPreview;
export const CreativePortfolioPreview = CreativePreview;
export const TechModernPreview = TimelinePreview;
export const ExecutivePreview = HighPerformerPreview;

// Template preview component mapper
export const getTemplatePreview = (templateId: string) => {
  switch (templateId) {
    case "double-column":
      return <DoubleColumnPreview />;
    case "ivy-league":
      return <IvyLeaguePreview />;
    case "elegant":
      return <ElegantPreview />;
    case "contemporary":
      return <ContemporaryPreview />;
    case "polished":
      return <PolishedPreview />;
    case "modern":
      return <ModernPreview />;
    case "creative":
      return <CreativePreview />;
    case "timeline":
      return <TimelinePreview />;
    case "stylish":
      return <StylishPreview />;
    case "single-column":
      return <SingleColumnPreview />;
    case "elegant-with-logos":
      return <ElegantWithLogosPreview />;
    case "double-column-with-logos":
      return <DoubleColumnWithLogosPreview />;
    case "compact":
      return <CompactPreview />;
    case "modern-with-logos":
      return <ModernWithLogosPreview />;
    case "multicolumn":
      return <MulticolumnPreview />;
    case "timeline-with-logos":
      return <TimelineWithLogosPreview />;
    case "classic":
      return <ClassicPreview />;
    case "ivy-league-with-logos":
      return <IvyLeagueWithLogosPreview />;
    case "high-performer":
      return <HighPerformerPreview />;
    case "minimal":
      return <MinimalPreview />;
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
