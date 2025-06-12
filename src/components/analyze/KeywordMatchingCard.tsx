
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { XCircle } from "lucide-react";
import { getScoreColor } from "./utils";

interface KeywordMatchingCardProps {
  score: number;
  missingKeywords: string[];
}

const KeywordMatchingCard = ({ score, missingKeywords }: KeywordMatchingCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Keyword Matching</span>
          <span className="text-lg font-bold">{score}%</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress 
          value={score} 
          className="h-2 mb-4" 
          indicatorColor={getScoreColor(score)} 
        />
        
        {missingKeywords && missingKeywords.length > 0 ? (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Missing important keywords:</p>
            <ul className="space-y-1">
              {missingKeywords.map((keyword, index) => (
                <li key={index} className="text-sm flex items-start">
                  <XCircle className="h-4 w-4 text-destructive mr-2 mt-px flex-shrink-0" />
                  <span>{keyword}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm mt-4">Great job! Your resume includes all the important keywords.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default KeywordMatchingCard;
