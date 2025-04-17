
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface AnalysisScoreProps {
  title: string;
  icon: LucideIcon;
  score: number;
  items: Array<{
    type: "success" | "warning" | "error";
    text: string;
  }>;
}

const AnalysisScore = ({ title, icon: Icon, score, items }: AnalysisScoreProps) => {
  const getIcon = (type: "success" | "warning" | "error") => {
    switch (type) {
      case "success":
        return "text-green-500";
      case "warning":
        return "text-yellow-500";
      case "error":
        return "text-red-500";
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon className="h-5 w-5 text-primary-600" />
              <h3 className="font-medium text-gray-900">{title}</h3>
            </div>
            <div className="text-lg font-medium text-primary-600">{score}%</div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-500 h-2 rounded-full" 
              style={{ width: `${score}%` }}
            ></div>
          </div>
          
          <div className="space-y-2 pt-2">
            {items.map((item, index) => (
              <div key={index} className="flex items-start">
                <span className={`h-5 w-5 mr-2 flex-shrink-0 mt-0.5 ${getIcon(item.type)}`}>
                  {item.type === "success" && "✓"}
                  {item.type === "warning" && "⚠"}
                  {item.type === "error" && "✕"}
                </span>
                <span className="text-sm text-gray-600">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisScore;
