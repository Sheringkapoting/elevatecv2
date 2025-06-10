
export interface FilterSelections {
  experience: string;
  hasPhoto: boolean | null;
  layout: string;
  style: string;
  occupation: string[];
}

export interface FilterStep {
  title: string;
  subtitle: string;
  type: string;
}

export interface LayoutOption {
  id: string;
  title: string;
  description: string;
  preview: React.ReactNode;
}

export interface StyleOption {
  id: string;
  title: string;
  description: string;
  preview: React.ReactNode;
}
