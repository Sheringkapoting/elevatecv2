
import ExperienceStep from "./ExperienceStep";
import PhotoStep from "./PhotoStep";
import LayoutStep from "./LayoutStep";
import StyleStep from "./StyleStep";
import OccupationStep from "./OccupationStep";
import { FilterSelections } from "./types";

interface StepContentProps {
  stepType: string;
  selections: FilterSelections;
  onSelectionChange: (type: string, value: any) => void;
}

const StepContent = ({ stepType, selections, onSelectionChange }: StepContentProps) => {
  switch (stepType) {
    case "experience":
      return (
        <ExperienceStep
          selectedExperience={selections.experience}
          onExperienceSelect={(experience) => onSelectionChange("experience", experience)}
        />
      );

    case "photo":
      return (
        <PhotoStep
          hasPhoto={selections.hasPhoto}
          onPhotoSelect={(hasPhoto) => onSelectionChange("hasPhoto", hasPhoto)}
        />
      );

    case "layout":
      return (
        <LayoutStep
          selectedLayout={selections.layout}
          onLayoutSelect={(layout) => onSelectionChange("layout", layout)}
        />
      );

    case "style":
      return (
        <StyleStep
          selectedStyle={selections.style}
          onStyleSelect={(style) => onSelectionChange("style", style)}
        />
      );

    case "occupation":
      return (
        <OccupationStep
          selectedOccupations={selections.occupation}
          onOccupationToggle={(occupation, checked) => {
            const newOccupations = checked 
              ? [...selections.occupation, occupation]
              : selections.occupation.filter(o => o !== occupation);
            onSelectionChange("occupation", newOccupations);
          }}
        />
      );

    default:
      return null;
  }
};

export default StepContent;
