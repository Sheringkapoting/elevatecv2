
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { getScoreColor } from "./utils";

interface ContentScoreCardProps {
  score: number;
}

const ContentScoreCard = ({ score }: ContentScoreCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Content Quality</span>
          <span className="text-lg font-bold">{score}%</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress 
          value={score} 
          className="h-2 mb-4" 
          indicatorColor={getScoreColor(score)} 
        />
        
        <div className="space-y-2 mt-4">
          {score < 70 && (
            <div className="flex items-start">
              <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-px flex-shrink-0" />
              <span className="text-sm">Use more achievement-oriented bullet points</span>
            </div>
          )}
          
          {score < 60 && (
            <div className="flex items-start">
              <XCircle className="h-4 w-4 text-destructive mr-2 mt-px flex-shrink-0" />
              <span className="text-sm">Quantify your achievements with metrics</span>
            </div>
          )}
          
          {score >= 70 && (
            <div className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-px flex-shrink-0" />
              <span className="text-sm">Strong content with good details</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentScoreCard;
