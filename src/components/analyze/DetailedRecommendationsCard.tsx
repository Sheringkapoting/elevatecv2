
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";

interface DetailedRecommendationsCardProps {
  suggestions: string[];
}

const DetailedRecommendationsCard = ({ suggestions }: DetailedRecommendationsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-left">Detailed Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {suggestions && suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div key={index}>
                {index > 0 && <Separator className="my-4" />}
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div className="flex-grow text-left">
                    <p className="font-medium mb-1">Improvement Suggestion</p>
                    <p className="text-gray-600">{suggestion}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-left">
              No specific improvement suggestions. Your resume is well-optimized for ATS systems!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedRecommendationsCard;
