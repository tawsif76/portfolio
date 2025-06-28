export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string[];
  image: string;
  techStack: string[];
  githubUrl?: string;
  features: string[];
  slug: string;
  date: string;
  category: string;
}
