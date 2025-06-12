
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { getScoreColor } from "./utils";

interface FormattingScoreCardProps {
  score: number;
}

const FormattingScoreCard = ({ score }: FormattingScoreCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Formatting</span>
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
          {score >= 80 ? (
            <div className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-px flex-shrink-0" />
              <span className="text-sm">Excellent formatting for ATS systems</span>
            </div>
          ) : (
            <div className="flex items-start">
              <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-px flex-shrink-0" />
              <span className="text-sm">Consider improving the structure with clear section headings</span>
            </div>
          )}
          
          {score < 60 && (
            <div className="flex items-start">
              <XCircle className="h-4 w-4 text-destructive mr-2 mt-px flex-shrink-0" />
              <span className="text-sm">Complex formatting may not parse correctly in ATS systems</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FormattingScoreCard;
