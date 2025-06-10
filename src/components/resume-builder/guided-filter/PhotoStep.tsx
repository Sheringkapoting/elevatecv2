
import { Card, CardContent } from "@/components/ui/card";

interface PhotoStepProps {
  hasPhoto: boolean | null;
  onPhotoSelect: (hasPhoto: boolean) => void;
}

const PhotoStep = ({ hasPhoto, onPhotoSelect }: PhotoStepProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
      <Card 
        className={`cursor-pointer border-2 ${hasPhoto === true ? 'border-blue-500' : 'border-gray-200'}`}
        onClick={() => onPhotoSelect(true)}
      >
        <CardContent className="p-6 text-center">
          <div className="w-full h-32 bg-blue-100 rounded mb-4 flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          </div>
          <h3 className="font-semibold mb-2">With Photo</h3>
        </CardContent>
      </Card>
      <Card 
        className={`cursor-pointer border-2 ${hasPhoto === false ? 'border-blue-500' : 'border-gray-200'}`}
        onClick={() => onPhotoSelect(false)}
      >
        <CardContent className="p-6 text-center">
          <div className="w-full h-32 bg-gray-100 rounded mb-4"></div>
          <h3 className="font-semibold mb-2">Without Photo</h3>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotoStep;
