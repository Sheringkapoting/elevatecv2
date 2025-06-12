
import React from 'react';
import { ColorPalette, useTemplate } from '@/contexts/TemplateContext';

interface ColorPaletteSelectorProps {
  templateId: string;
  palettes: ColorPalette[];
  isSelected: boolean;
  onColorChange?: (palette: ColorPalette) => void;
}

const ColorPaletteSelector: React.FC<ColorPaletteSelectorProps> = ({ 
  templateId, 
  palettes,
  isSelected,
  onColorChange
}) => {
  const { selectedColorPalette, setSelectedColorPalette } = useTemplate();

  const handlePaletteSelect = (palette: ColorPalette) => {
    if (isSelected) {
      setSelectedColorPalette(palette);
      onColorChange?.(palette);
    }
  };

  // Only show color selector for the selected template
  if (!isSelected) {
    return null;
  }

  return (
    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
      <p className="text-sm font-medium text-gray-700 mb-2">Choose Color</p>
      <div className="flex gap-2 flex-wrap">
        {palettes.map((palette) => (
          <button
            key={palette.id}
            onClick={() => handlePaletteSelect(palette)}
            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 flex items-center justify-center ${
              selectedColorPalette?.id === palette.id
                ? 'border-gray-800 shadow-lg scale-110'
                : 'border-gray-300 hover:border-gray-500'
            }`}
            style={{ backgroundColor: palette.primary }}
            title={palette.name}
          >
            {selectedColorPalette?.id === palette.id && (
              <div className="w-2 h-2 bg-white rounded-full"></div>
            )}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Selected: {selectedColorPalette?.name || palettes[0]?.name}
      </p>
    </div>
  );
};

export default ColorPaletteSelector;
