import React from 'react';
import { ColorPalette } from '@/contexts/TemplateContext';

export const getTemplatePreview = (templateId: string, colorPalette?: ColorPalette) => {
  const primaryColor = colorPalette?.primary || getDefaultColor(templateId);
  const secondaryColor = colorPalette?.secondary || getDefaultSecondaryColor(templateId);
  
  switch (templateId) {
    case "double-column":
      return (
        <div className="h-full bg-white flex text-xs">
          <div className="w-1/3 p-3 text-white" style={{ backgroundColor: primaryColor }}>
            <div className="w-8 h-8 bg-white rounded-full mx-auto mb-2" style={{ backgroundColor: secondaryColor }}></div>
            <div className="space-y-2">
              <div className="h-1 bg-white bg-opacity-80 rounded"></div>
              <div className="h-1 bg-white bg-opacity-60 rounded w-3/4"></div>
              <div className="h-1 bg-white bg-opacity-60 rounded w-1/2"></div>
            </div>
            <div className="mt-4 space-y-1">
              <div className="h-1 bg-white bg-opacity-80 rounded"></div>
              <div className="h-1 bg-white bg-opacity-60 rounded"></div>
              <div className="h-1 bg-white bg-opacity-60 rounded w-4/5"></div>
            </div>
          </div>
          <div className="w-2/3 p-3">
            <div className="h-2 rounded mb-2" style={{ backgroundColor: primaryColor }}></div>
            <div className="space-y-1">
              <div className="h-1 bg-gray-300 rounded"></div>
              <div className="h-1 bg-gray-300 rounded w-4/5"></div>
              <div className="h-1 bg-gray-300 rounded w-3/5"></div>
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-1 bg-gray-400 rounded w-2/3"></div>
              <div className="space-y-1">
                <div className="h-1 bg-gray-300 rounded"></div>
                <div className="h-1 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      );

    case "elegant":
      return (
        <div className="h-full bg-white flex text-xs">
          <div className="w-1/3 p-3 text-white" style={{ backgroundColor: primaryColor }}>
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full mx-auto mb-3"></div>
            <div className="text-center mb-4">
              <div className="h-1 bg-white bg-opacity-80 rounded mb-1"></div>
              <div className="h-1 bg-white bg-opacity-60 rounded w-3/4 mx-auto"></div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="h-1 bg-white bg-opacity-80 rounded mb-1"></div>
                <div className="space-y-1">
                  <div className="h-1 bg-white bg-opacity-60 rounded"></div>
                  <div className="h-1 bg-white bg-opacity-60 rounded w-4/5"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/3 p-3">
            <div className="space-y-1 mb-3">
              <div className="h-1 bg-gray-300 rounded"></div>
              <div className="h-1 bg-gray-300 rounded w-4/5"></div>
              <div className="h-1 bg-gray-300 rounded w-3/5"></div>
            </div>
            <div className="border-l-2 pl-2 mb-3" style={{ borderColor: primaryColor }}>
              <div className="h-1 bg-gray-400 rounded w-1/2 mb-1"></div>
              <div className="space-y-1">
                <div className="h-1 bg-gray-300 rounded"></div>
                <div className="h-1 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      );

    case "contemporary":
      return (
        <div className="h-full bg-white flex text-xs">
          <div className="w-1/3 p-3 text-white" style={{ backgroundColor: primaryColor }}>
            <div className="w-8 h-8 bg-white rounded-full mx-auto mb-2 flex items-center justify-center text-xs font-bold" style={{ color: primaryColor }}>
              JD
            </div>
            <div className="text-center space-y-1 mb-3">
              <div className="h-1 bg-white bg-opacity-90 rounded"></div>
              <div className="h-1 bg-white bg-opacity-70 rounded w-3/4 mx-auto"></div>
            </div>
            <div className="space-y-2">
              <div className="h-1 bg-white bg-opacity-80 rounded w-1/2"></div>
              <div className="space-y-1">
                <div className="h-1 bg-white bg-opacity-60 rounded"></div>
                <div className="h-1 bg-white bg-opacity-60 rounded w-4/5"></div>
              </div>
            </div>
          </div>
          <div className="w-2/3 p-3">
            <div className="h-1 rounded mb-2" style={{ backgroundColor: primaryColor }}></div>
            <div className="space-y-1 mb-3">
              <div className="h-1 bg-gray-300 rounded"></div>
              <div className="h-1 bg-gray-300 rounded w-4/5"></div>
            </div>
            <div className="space-y-2">
              <div className="h-1 rounded w-1/2" style={{ backgroundColor: primaryColor }}></div>
              <div className="space-y-1">
                <div className="h-1 bg-gray-300 rounded"></div>
                <div className="h-1 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      );

    case "polished":
      return (
        <div className="h-full bg-white flex text-xs">
          <div className="w-1/3 p-3 text-white" style={{ backgroundColor: primaryColor }}>
            <div className="w-10 h-10 bg-white rounded-full mx-auto mb-3"></div>
            <div className="text-center mb-4">
              <div className="h-1 bg-white bg-opacity-80 rounded mb-1"></div>
              <div className="h-1 bg-white bg-opacity-60 rounded w-3/4 mx-auto"></div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="h-1 bg-white bg-opacity-80 rounded mb-1"></div>
                <div className="space-y-1">
                  <div className="h-1 bg-white bg-opacity-60 rounded"></div>
                  <div className="h-1 bg-white bg-opacity-60 rounded w-4/5"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/3 p-3">
            <div className="space-y-1 mb-3">
              <div className="h-1 bg-gray-300 rounded"></div>
              <div className="h-1 bg-gray-300 rounded w-4/5"></div>
              <div className="h-1 bg-gray-300 rounded w-3/5"></div>
            </div>
            <div className="border-l-2 pl-2 mb-3" style={{ borderColor: primaryColor }}>
              <div className="h-1 bg-gray-400 rounded w-1/2 mb-1"></div>
              <div className="space-y-1">
                <div className="h-1 bg-gray-300 rounded"></div>
                <div className="h-1 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      );

    case "modern":
      return (
        <div className="h-full bg-white flex text-xs">
          <div className="w-1/3 p-3 text-white" style={{ backgroundColor: primaryColor }}>
            <div className="w-10 h-10 bg-white rounded-full mx-auto mb-3"></div>
            <div className="text-center mb-4">
              <div className="h-1 bg-white bg-opacity-80 rounded mb-1"></div>
              <div className="h-1 bg-white bg-opacity-60 rounded w-3/4 mx-auto"></div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="h-1 bg-white bg-opacity-80 rounded mb-1"></div>
                <div className="space-y-1">
                  <div className="h-1 bg-white bg-opacity-60 rounded"></div>
                  <div className="h-1 bg-white bg-opacity-60 rounded w-4/5"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/3 p-3">
            <div className="space-y-1 mb-3">
              <div className="h-1 bg-gray-300 rounded"></div>
              <div className="h-1 bg-gray-300 rounded w-4/5"></div>
              <div className="h-1 bg-gray-300 rounded w-3/5"></div>
            </div>
            <div className="border-l-2 pl-2 mb-3" style={{ borderColor: primaryColor }}>
              <div className="h-1 bg-gray-400 rounded w-1/2 mb-1"></div>
              <div className="space-y-1">
                <div className="h-1 bg-gray-300 rounded"></div>
                <div className="h-1 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      );

    case "creative":
      return (
        <div className="h-full bg-white flex text-xs">
          <div className="w-1/3 p-3 text-white" style={{ backgroundColor: primaryColor }}>
            <div className="w-10 h-10 bg-white rounded-full mx-auto mb-3"></div>
            <div className="text-center mb-4">
              <div className="h-1 bg-white bg-opacity-80 rounded mb-1"></div>
              <div className="h-1 bg-white bg-opacity-60 rounded w-3/4 mx-auto"></div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="h-1 bg-white bg-opacity-80 rounded mb-1"></div>
                <div className="space-y-1">
                  <div className="h-1 bg-white bg-opacity-60 rounded"></div>
                  <div className="h-1 bg-white bg-opacity-60 rounded w-4/5"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/3 p-3">
            <div className="space-y-1 mb-3">
              <div className="h-1 bg-gray-300 rounded"></div>
              <div className="h-1 bg-gray-300 rounded w-4/5"></div>
              <div className="h-1 bg-gray-300 rounded w-3/5"></div>
            </div>
            <div className="border-l-2 pl-2 mb-3" style={{ borderColor: primaryColor }}>
              <div className="h-1 bg-gray-400 rounded w-1/2 mb-1"></div>
              <div className="space-y-1">
                <div className="h-1 bg-gray-300 rounded"></div>
                <div className="h-1 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      );

    case "timeline":
      return (
        <div className="h-full bg-white flex text-xs">
          <div className="w-full p-3" style={{ borderLeft: `4px solid ${primaryColor}` }}>
            <div className="h-2 rounded mb-2" style={{ backgroundColor: primaryColor }}></div>
            <div className="space-y-1 mb-3">
              <div className="h-1 bg-gray-300 rounded"></div>
              <div className="h-1 bg-gray-300 rounded w-4/5"></div>
              <div className="h-1 bg-gray-300 rounded w-3/5"></div>
            </div>
            <div className="space-y-2">
              <div className="h-1 rounded w-1/2" style={{ backgroundColor: primaryColor }}></div>
              <div className="space-y-1">
                <div className="h-1 bg-gray-300 rounded"></div>
                <div className="h-1 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      );

    case "stylish":
      return (
        <div className="h-full bg-white flex text-xs">
          <div className="w-full p-3" style={{ borderLeft: `4px solid ${primaryColor}` }}>
            <div className="h-2 rounded mb-2" style={{ backgroundColor: primaryColor }}></div>
            <div className="space-y-1 mb-3">
              <div className="h-1 bg-gray-300 rounded"></div>
              <div className="h-1 bg-gray-300 rounded w-4/5"></div>
              <div className="h-1 bg-gray-300 rounded w-3/5"></div>
            </div>
            <div className="space-y-2">
              <div className="h-1 rounded w-1/2" style={{ backgroundColor: primaryColor }}></div>
              <div className="space-y-1">
                <div className="h-1 bg-gray-300 rounded"></div>
                <div className="h-1 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      );

    case "single-column":
      return (
        <div className="h-full bg-white p-4 flex flex-col justify-center items-center text-xs">
          <div className="w-full h-4 rounded mb-3" style={{ backgroundColor: primaryColor }}></div>
          <div className="w-full space-y-2">
            <div className="h-1 bg-gray-300 rounded"></div>
            <div className="h-1 bg-gray-300 rounded w-4/5"></div>
            <div className="h-1 bg-gray-300 rounded w-3/5"></div>
            <div className="h-1 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      );

    default:
      return (
        <div className="h-full bg-white p-4 flex flex-col justify-center items-center text-xs">
          <div className="w-full h-4 rounded mb-3" style={{ backgroundColor: primaryColor }}></div>
          <div className="w-full space-y-2">
            <div className="h-1 bg-gray-300 rounded"></div>
            <div className="h-1 bg-gray-300 rounded w-4/5"></div>
            <div className="h-1 bg-gray-300 rounded w-3/5"></div>
            <div className="h-1 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      );
  }
};

const getDefaultColor = (templateId: string): string => {
  const colorMap: Record<string, string> = {
    "double-column": "#0d9488",
    "elegant": "#475569",
    "contemporary": "#10b981",
    "polished": "#0d9488",
    "modern": "#3b82f6",
    "creative": "#1e293b",
    "timeline": "#f97316",
    "stylish": "#8b5cf6",
    "single-column": "#6b7280",
    // Add more defaults as needed
  };
  return colorMap[templateId] || "#3b82f6";
};

const getDefaultSecondaryColor = (templateId: string): string => {
  const colorMap: Record<string, string> = {
    "double-column": "#14b8a6",
    "elegant": "#64748b",
    "contemporary": "#34d399",
    "polished": "#14b8a6",
    "modern": "#60a5fa",
    "creative": "#334155",
    "timeline": "#fb923c",
    "stylish": "#a78bfa",
    "single-column": "#9ca3af",
    // Add more defaults as needed
  };
  return colorMap[templateId] || "#60a5fa";
};
