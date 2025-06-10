
import { occupationOptions } from "./constants";

interface OccupationStepProps {
  selectedOccupations: string[];
  onOccupationToggle: (occupation: string, checked: boolean) => void;
}

const OccupationStep = ({ selectedOccupations, onOccupationToggle }: OccupationStepProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
      {occupationOptions.map((option) => (
        <label key={option} className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedOccupations.includes(option)}
            onChange={(e) => onOccupationToggle(option, e.target.checked)}
            className="rounded border-gray-300"
          />
          <span className="text-left text-sm">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default OccupationStep;
