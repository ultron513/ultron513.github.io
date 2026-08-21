export type Experience = {
  organization: string;
  role: string;
  period: string;
  location: string;
  featured: boolean;
  description: string;
  responsibilities: readonly string[];
};