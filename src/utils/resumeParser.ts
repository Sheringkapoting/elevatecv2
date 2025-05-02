
/**
 * Utility for extracting structured data from resume files
 */

// Define the structure of parsed resume data
export interface ParsedResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
  };
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
  }>;
}

/**
 * Extract structured data from resume text
 * @param resumeText Text content extracted from resume
 * @returns Structured resume data
 */
export const parseResumeText = (resumeText: string): ParsedResumeData => {
  const lines = resumeText.split('\n').map(line => line.trim());
  
  // Initialize parsed data structure
  const parsedData: ParsedResumeData = {
    personalInfo: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
    },
    experience: [],
    education: [],
    skills: []
  };
  
  // Extract personal information using regex patterns
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const phoneRegex = /(\+\d{1,3}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;
  const linkedinRegex = /linkedin\.com\/in\/[a-zA-Z0-9_-]+/;
  const websiteRegex = /(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?/;
  
  // Try to extract email
  const emailMatch = resumeText.match(emailRegex);
  if (emailMatch) {
    parsedData.personalInfo.email = emailMatch[0];
  }
  
  // Try to extract phone
  const phoneMatch = resumeText.match(phoneRegex);
  if (phoneMatch) {
    parsedData.personalInfo.phone = phoneMatch[0];
  }
  
  // Try to extract LinkedIn
  const linkedinMatch = resumeText.match(linkedinRegex);
  if (linkedinMatch) {
    parsedData.personalInfo.linkedin = `https://${linkedinMatch[0]}`;
  }
  
  // Try to extract website
  const websiteMatch = resumeText.match(websiteRegex);
  if (websiteMatch && !websiteMatch[0].includes('linkedin.com')) {
    parsedData.personalInfo.website = websiteMatch[0].startsWith('http') ? websiteMatch[0] : `https://${websiteMatch[0]}`;
  }
  
  // Try to extract name (usually first non-empty line)
  for (const line of lines) {
    if (line.length > 0 && !line.match(emailRegex) && !line.match(phoneRegex)) {
      parsedData.personalInfo.name = line;
      break;
    }
  }
  
  // Try to extract job title (usually after name)
  let nameIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === parsedData.personalInfo.name) {
      nameIndex = i;
      break;
    }
  }
  if (nameIndex !== -1 && nameIndex + 1 < lines.length) {
    parsedData.personalInfo.title = lines[nameIndex + 1];
  }
  
  // Try to extract skills
  const skillSection = findSection(lines, ["SKILLS", "TECHNICAL SKILLS", "CORE COMPETENCIES"]);
  if (skillSection) {
    const skills = extractSkills(skillSection);
    parsedData.skills = skills.map((skill, index) => ({
      id: `skill-${index + 1}`,
      name: skill
    }));
  }
  
  // Try to extract experience
  const experienceSection = findSection(lines, ["EXPERIENCE", "WORK EXPERIENCE", "PROFESSIONAL EXPERIENCE"]);
  if (experienceSection) {
    const experiences = extractExperiences(experienceSection);
    parsedData.experience = experiences.map((exp, index) => ({
      id: `exp-${index + 1}`,
      title: exp.title || "",
      company: exp.company || "",
      location: exp.location || "",
      startDate: exp.startDate || "",
      endDate: exp.endDate || "",
      current: exp.endDate.toLowerCase().includes("present"),
      description: exp.description || ""
    }));
  }
  
  // Try to extract education
  const educationSection = findSection(lines, ["EDUCATION", "ACADEMIC BACKGROUND"]);
  if (educationSection) {
    const educations = extractEducations(educationSection);
    parsedData.education = educations.map((edu, index) => ({
      id: `edu-${index + 1}`,
      degree: edu.degree || "",
      school: edu.school || "",
      location: edu.location || "",
      startDate: edu.startDate || "",
      endDate: edu.endDate || "",
      description: edu.description || ""
    }));
  }
  
  return parsedData;
};

/**
 * Find a specific section in resume text
 */
const findSection = (lines: string[], sectionNames: string[]) => {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toUpperCase();
    if (sectionNames.some(name => line.includes(name))) {
      // Return this section until the next major section
      let sectionEnd = lines.length;
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].toUpperCase() === lines[j] && lines[j].length > 3) {
          sectionEnd = j;
          break;
        }
      }
      return lines.slice(i, sectionEnd).join('\n');
    }
  }
  return null;
};

/**
 * Extract skills from skills section
 */
const extractSkills = (section: string): string[] => {
  // Remove section title
  const content = section.split('\n').slice(1).join(' ');
  
  // First try comma-separated format
  let skills = content.split(',').map(s => s.trim());
  
  // If that doesn't yield reasonable results, try bullet points
  if (skills.length < 2 || skills.some(s => s.length > 50)) {
    skills = content.split('•').map(s => s.trim());
  }
  
  // Filter out empty skills
  return skills.filter(s => s.length > 0 && s.length < 50);
};

/**
 * Extract experiences from experience section
 */
const extractExperiences = (section: string) => {
  const lines = section.split('\n');
  const experiences = [];
  
  // Simple pattern matching for job entries
  let currentExp: any = {};
  let currentDescription = '';
  let inDescription = false;
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.length === 0) {
      continue;
    }
    
    // Check for new job entry (company with date)
    const dateMatch = line.match(/(\w+\s\d{4})\s*-\s*(\w+\s\d{4}|Present)/i);
    if (dateMatch || (line.toUpperCase() === line && line.length > 3)) {
      // Save previous experience if exists
      if (Object.keys(currentExp).length > 0) {
        currentExp.description = currentDescription.trim();
        experiences.push(currentExp);
        currentDescription = '';
      }
      
      currentExp = {};
      inDescription = false;
      
      // Parse company and title from this line or next
      if (dateMatch) {
        // This line has dates, so it's likely company + dates
        currentExp.company = line.split(dateMatch[0])[0].trim();
        currentExp.startDate = dateMatch[1];
        currentExp.endDate = dateMatch[2];
        currentExp.title = lines[i+1]?.trim() || '';
        i++; // Skip next line as we've used it for title
      } else {
        // This line is likely company, next line might be title
        currentExp.company = line;
        if (i+1 < lines.length && !lines[i+1].toUpperCase().includes('EDUCATION')) {
          currentExp.title = lines[i+1]?.trim() || '';
          i++;
        }
      }
      
      // Look for location
      if (currentExp.company && currentExp.company.includes(',')) {
        const parts = currentExp.company.split(',');
        currentExp.company = parts[0].trim();
        currentExp.location = parts[1].trim();
      }
      
      inDescription = true;
    } else if (inDescription) {
      currentDescription += line + ' ';
    }
  }
  
  // Add the last experience
  if (Object.keys(currentExp).length > 0) {
    currentExp.description = currentDescription.trim();
    experiences.push(currentExp);
  }
  
  return experiences;
};

/**
 * Extract education from education section
 */
const extractEducations = (section: string) => {
  const lines = section.split('\n');
  const educations = [];
  
  let currentEdu: any = {};
  let currentDescription = '';
  let inDescription = false;
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.length === 0) {
      continue;
    }
    
    // Check for new education entry (school with date)
    const dateMatch = line.match(/(\w+\s\d{4})\s*-\s*(\w+\s\d{4}|Present)/i);
    if (dateMatch || (line.toUpperCase() === line && line.length > 3)) {
      // Save previous education if exists
      if (Object.keys(currentEdu).length > 0) {
        currentEdu.description = currentDescription.trim();
        educations.push(currentEdu);
        currentDescription = '';
      }
      
      currentEdu = {};
      inDescription = false;
      
      if (dateMatch) {
        // This line has dates
        currentEdu.school = line.split(dateMatch[0])[0].trim();
        currentEdu.startDate = dateMatch[1];
        currentEdu.endDate = dateMatch[2];
      } else {
        currentEdu.school = line;
      }
      
      // Look for location
      if (currentEdu.school && currentEdu.school.includes(',')) {
        const parts = currentEdu.school.split(',');
        currentEdu.school = parts[0].trim();
        currentEdu.location = parts[1].trim();
      }
      
      // Next line might be degree
      if (i+1 < lines.length) {
        const nextLine = lines[i+1].trim();
        if (!nextLine.toUpperCase().includes('EXPERIENCE') && nextLine.length > 0) {
          currentEdu.degree = nextLine;
          i++;
        }
      }
      
      inDescription = true;
    } else if (inDescription) {
      currentDescription += line + ' ';
    }
  }
  
  // Add the last education
  if (Object.keys(currentEdu).length > 0) {
    currentEdu.description = currentDescription.trim();
    educations.push(currentEdu);
  }
  
  return educations;
};
