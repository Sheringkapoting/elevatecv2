
import React from 'react';
import { ColorPalette, useTemplate } from '@/contexts/TemplateContext';

interface ColorPaletteSelectorProps {
  templateId: string;
  palettes: ColorPalette[];
}

const ColorPaletteSelector: React.FC<ColorPaletteSelectorProps> = ({ 
  templateId, 
  palettes 
}) => {
  const { selectedColorPalette, setSelectedColorPalette } = useTemplate();

  const handlePaletteSelect = (palette: ColorPalette) => {
    setSelectedColorPalette(palette);
  };

  return (
    <div className="flex gap-1 mt-2">
      {palettes.map((palette) => (
        <button
          key={palette.id}
          onClick={() => handlePaletteSelect(palette)}
          className={`w-4 h-4 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
            selectedColorPalette?.id === palette.id
              ? 'border-gray-800 shadow-md scale-110'
              : 'border-gray-300'
          }`}
          style={{ backgroundColor: palette.primary }}
          title={palette.name}
        />
      ))}
    </div>
  );
};

export default ColorPaletteSelector;
