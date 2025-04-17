
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Search } from "lucide-react";

interface JobDescriptionProps {
  value: string;
  onChange: (value: string) => void;
}

const JobDescription = ({ value, onChange }: JobDescriptionProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-5 w-5 text-primary-600" />
            <h2 className="text-xl font-medium text-gray-900">Job Description</h2>
          </div>
          
          <div>
            <textarea
              className="w-full h-[230px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Paste the job description here to compare against your resume..."
              value={value}
              onChange={(e) => onChange(e.target.value)}
            ></textarea>
          </div>
          
          {value && (
            <div className="flex items-center space-x-2 text-sm text-primary-600 font-medium">
              <CheckCircle className="h-4 w-4" />
              <span>Job description ready for analysis</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobDescription;
