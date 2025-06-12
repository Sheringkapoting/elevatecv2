
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { getScoreColor, getScoreSummary } from "./utils";

interface AtsSummaryCardProps {
  score: number;
}

const AtsSummaryCard = ({ score }: AtsSummaryCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="mr-6">
              <div className="relative">
                <Progress 
                  value={score} 
                  className="h-24 w-24 bg-gray-100" 
                  indicatorColor={getScoreColor(score)} 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{score}%</span>
                </div>
              </div>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold mb-1">ATS Compatibility Score</h3>
              <p className="text-gray-500">
                {getScoreSummary(score)}
              </p>
            </div>
          </div>
          
          <Button variant="outline" className="mt-4 md:mt-0">
            Download Full Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AtsSummaryCard;
