
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface TemplateFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
}

export interface FilterState {
  headshot: string[];
  columns: string[];
  style: string[];
  occupation: string[];
}

const TemplateFilters = ({ onFiltersChange }: TemplateFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    headshot: [],
    columns: [],
    style: [],
    occupation: [],
  });

  const handleFilterChange = (category: keyof FilterState, value: string, checked: boolean) => {
    const newFilters = { ...filters };
    if (checked) {
      newFilters[category] = [...newFilters[category], value];
    } else {
      newFilters[category] = newFilters[category].filter(item => item !== value);
    }
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      headshot: [],
      columns: [],
      style: [],
      occupation: [],
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="w-64 p-6 bg-white border-r border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-blue-600 hover:text-blue-700">
          Clear filters
        </Button>
      </div>

      {/* Headshot Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Headshot</h4>
        <div className="space-y-2">
          {['With photo', 'Without photo'].map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`headshot-${option}`}
                checked={filters.headshot.includes(option)}
                onCheckedChange={(checked) => 
                  handleFilterChange('headshot', option, checked as boolean)
                }
              />
              <label htmlFor={`headshot-${option}`} className="text-sm text-gray-700">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Columns Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Columns</h4>
        <div className="space-y-2">
          {['1 column', '2 columns'].map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`columns-${option}`}
                checked={filters.columns.includes(option)}
                onCheckedChange={(checked) => 
                  handleFilterChange('columns', option, checked as boolean)
                }
              />
              <label htmlFor={`columns-${option}`} className="text-sm text-gray-700">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Style Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Style</h4>
        <div className="space-y-2">
          {['Traditional', 'Creative', 'Contemporary'].map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`style-${option}`}
                checked={filters.style.includes(option)}
                onCheckedChange={(checked) => 
                  handleFilterChange('style', option, checked as boolean)
                }
              />
              <label htmlFor={`style-${option}`} className="text-sm text-gray-700">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Occupation Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Occupation</h4>
        <div className="space-y-2">
          {[
            'Management & Executive',
            'Office & Administrative Support',
            'Business & Finance',
            'Retail & Sales'
          ].map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`occupation-${option}`}
                checked={filters.occupation.includes(option)}
                onCheckedChange={(checked) => 
                  handleFilterChange('occupation', option, checked as boolean)
                }
              />
              <label htmlFor={`occupation-${option}`} className="text-sm text-gray-700">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateFilters;
