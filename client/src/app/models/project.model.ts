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
  designSpecs?: { label: string, value: string, type: string }[];
}
