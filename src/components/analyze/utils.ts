
export function getScoreColor(score: number): string {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-amber-500";
  return "bg-red-500";
}

export function getScoreSummary(score: number): string {
  if (score >= 80) return "Excellent! Your resume is highly compatible with ATS systems.";
  if (score >= 60) return "Good! Your resume is fairly compatible with ATS systems.";
  return "Your resume needs improvement to be more compatible with ATS systems.";
}
