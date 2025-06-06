
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ColorPalette {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
  colors: string[];
}

interface TemplateContextType {
  selectedTemplate: string;
  selectedColorPalette: ColorPalette | null;
  setSelectedTemplate: (templateId: string) => void;
  setSelectedColorPalette: (palette: ColorPalette) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
};

interface TemplateProviderProps {
  children: ReactNode;
}

export const TemplateProvider: React.FC<TemplateProviderProps> = ({ children }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('double-column');
  const [selectedColorPalette, setSelectedColorPalette] = useState<ColorPalette | null>(null);

  return (
    <TemplateContext.Provider
      value={{
        selectedTemplate,
        selectedColorPalette,
        setSelectedTemplate,
        setSelectedColorPalette,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};
