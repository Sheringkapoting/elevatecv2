
// Supabase Edge Function: analyze-resume
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_KEY')!;

function extractTextFromBuffer(buffer: Uint8Array, mimetype: string) {
  // For demonstration, just extract text from text files or dummy for PDF/DOCX
  if (mimetype === 'text/plain') {
    return new TextDecoder().decode(buffer);
  }
  // Pretend to extract text for non-txt formats
  return "[[Resume text extraction for non-txt formats is a demo]]";
}

function analyzeATS(resumeText: string, jobDesc: string) {
  // Dummy: Score based on section presence, some keywords, formatting signs
  const keywords = [
    ".NET Core", "MudBlazor", "ASP.NET Identity", "Blazor",
    "JavaScript", "React", "TypeScript", "API"
  ];
  const sections = ["Experience", "Skills", "Education", "Summary"];
  let ats = 70, keywordScore = 40, formattingScore = 50, contentScore = 40;
  let missing = [];
  let improvement: string[] = [];

  // Keyword scan
  let found = 0;
  keywords.forEach(kw => {
    if (resumeText.toLowerCase().includes(kw.toLowerCase())) found += 1;
    else missing.push(kw);
  });
  keywordScore = Math.round((found / keywords.length) * 100);

  // Section scan
  let sectionsFound = 0;
  sections.forEach(s => {
    if (resumeText.toLowerCase().includes(s.toLowerCase())) sectionsFound++;
  });
  formattingScore += sectionsFound * 10;

  // Dummy: count numeric bullet points for achievements
  const bullets = (resumeText.match(/[\n•-]/g) || []).length;
  contentScore += bullets > 5 ? 20 : 0;

  // Dummy: overall ATS
  ats = Math.round((keywordScore * 0.4) + (formattingScore * 0.3) + (contentScore * 0.3));
  if (sectionsFound < 3) improvement.push("Add standard resume sections (Experience, Skills, Education, Summary/Objective).");
  if (missing.length >= 4) improvement.push("Add more job-related keywords.");
  if (bullets <= 5) improvement.push("Use achievement-oriented bullet points.");
  if (ats < 60) improvement.push("Improve formatting and add more keywords.");

  // Limit arrays
  missing = missing.slice(0, 5);
  improvement = improvement.slice(0, 3);

  return { ats, keywordScore, formattingScore, contentScore, missing, improvement };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    const { resumeFilePath, jobDescription, user_id } = await req.json();

    if (!resumeFilePath || !jobDescription || !user_id)
      return new Response(JSON.stringify({ error: "Missing required parameters." }), { status: 400, headers: corsHeaders });

    // Download resume
    const { data: fileData, error: downloadError } = await supabase
      .storage.from("resumes").download(resumeFilePath);
    if (downloadError || !fileData)
      return new Response(JSON.stringify({ error: "Failed to download resume." }), { status: 400, headers: corsHeaders });

    let mimetype = "application/octet-stream";
    try { mimetype = fileData.type || "text/plain"; } catch {}
    const buffer = await fileData.arrayBuffer ? await fileData.arrayBuffer() : fileData;
    const resumeText = extractTextFromBuffer(new Uint8Array(buffer), mimetype);

    // Analyze
    const result = analyzeATS(resumeText, jobDescription);

    // Save to DB
    const { error: insertError } = await supabase
      .from("resume_analysis")
      .insert({
        user_id,
        resume_file_path: resumeFilePath,
        job_description: jobDescription,
        ats_score: result.ats,
        keyword_score: result.keywordScore,
        formatting_score: result.formattingScore,
        content_score: result.contentScore,
        missing_keywords: result.missing,
        improvement_suggestions: result.improvement
      });

    if (insertError)
      return new Response(JSON.stringify({ error: "Failed to save analysis." }), { status: 500, headers: corsHeaders });

    // Return result
    return new Response(JSON.stringify({
      ats_score: result.ats,
      keyword_score: result.keywordScore,
      formatting_score: result.formattingScore,
      content_score: result.contentScore,
      missing_keywords: result.missing,
      improvement_suggestions: result.improvement
    }), { status: 200, headers: corsHeaders });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
  }
});
