export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  companyLogo?: string;
  gallery?: string[];
  content: string;
  tags?: string[];
  challenge?: string;
  solution?: string;
  result?: string;
  createdAt: Date;
  mockupUrl?: string;
  completedDate?: string;
  isFeatured?: boolean;
  order?: number;
  type?: string;
  layout?: string;
  designSpecs?: { label: string, value: string, type: string }[];
  colorPalette?: { hex: string, rgb: string, cmyk: string, pms: string }[];
  
  // New fields for ProjectDescription component
  year?: string;
  role?: string;
  overview?: {
    lead: string;
    bullets: string[];
  };
  product?: {
    problem: string;
    uxChallenge: string;
    decisions: string[];
  };
  build?: {
    responsibilities: string[];
    stack: string[];
    status: string;
  };
  links?: { label: string, href: string }[];
  extraSections?: { title: string, paragraphs: string[] }[];
}
