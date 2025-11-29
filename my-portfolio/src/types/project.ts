export interface Project {
  id: string;
  title: string;
  highlights: string[];
  techStack: string[];
  reportUrl?: string; // Changed to optional
  githubUrl?: string;
  image?: string;
  date: string;
  category: string;
}
