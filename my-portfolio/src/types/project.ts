export interface Project {
  id: string;
  title: string;
  slug: string; // Added this field
  highlights: string[];
  techStack: string[];
  reportUrl?: string;
  githubUrl?: string;
  image?: string;
  date: string;
  category: string;
}
