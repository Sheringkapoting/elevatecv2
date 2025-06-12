
import { Card, CardContent } from "@/components/ui/card";

interface PhotoStepProps {
  hasPhoto: boolean | null;
  onPhotoSelect: (hasPhoto: boolean) => void;
}

const PhotoStep = ({ hasPhoto, onPhotoSelect }: PhotoStepProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
      <Card 
        className={`cursor-pointer border-2 ${hasPhoto === true ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} hover:border-blue-300 transition-colors`}
        onClick={() => onPhotoSelect(true)}
      >
        <CardContent className="p-6 text-center">
          <div className="w-full h-40 bg-white border border-gray-200 rounded mb-4 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Header lines */}
            <div className="absolute top-3 left-3 right-3">
              <div className="h-1 bg-gray-300 rounded mb-1"></div>
              <div className="h-1 bg-gray-300 rounded w-3/4"></div>
            </div>
            
            {/* Profile photo circle */}
            <div className="w-12 h-12 bg-blue-500 rounded-full mt-6 mb-3 flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
            </div>
            
            {/* Content lines */}
            <div className="w-full px-3 space-y-1">
              <div className="h-1 bg-gray-200 rounded"></div>
              <div className="h-1 bg-gray-200 rounded w-4/5"></div>
              <div className="h-1 bg-gray-200 rounded w-3/5"></div>
              <div className="h-1 bg-gray-200 rounded w-5/6"></div>
              <div className="h-1 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
          <h3 className="font-semibold mb-2">With Photo</h3>
        </CardContent>
      </Card>
      
      <Card 
        className={`cursor-pointer border-2 ${hasPhoto === false ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} hover:border-blue-300 transition-colors`}
        onClick={() => onPhotoSelect(false)}
      >
        <CardContent className="p-6 text-center">
          <div className="w-full h-40 bg-white border border-gray-200 rounded mb-4 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Header lines */}
            <div className="absolute top-3 left-3 right-3">
              <div className="h-1 bg-gray-300 rounded mb-1"></div>
              <div className="h-1 bg-gray-300 rounded w-3/4"></div>
            </div>
            
            {/* Content lines without photo */}
            <div className="w-full px-3 space-y-1 mt-8">
              <div className="h-1 bg-gray-200 rounded"></div>
              <div className="h-1 bg-gray-200 rounded w-4/5"></div>
              <div className="h-1 bg-gray-200 rounded w-3/5"></div>
              <div className="h-1 bg-gray-200 rounded w-5/6"></div>
              <div className="h-1 bg-gray-200 rounded w-2/3"></div>
              <div className="h-1 bg-gray-200 rounded w-4/5"></div>
              <div className="h-1 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
          <h3 className="font-semibold mb-2">Without Photo</h3>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotoStep;
