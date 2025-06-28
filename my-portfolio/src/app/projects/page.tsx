import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import ProjectsGrid from '@/components/projects/ProjectsGrid';

export const metadata: Metadata = {
  title: 'Projects | Academic Portfolio',
  description: 'Explore my academic and research projects in computer science and networking.',
};

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Academic Projects
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          A collection of my academic and research projects in computer science, networking, and related fields.
        </p>
      </div>
      
      <div className="mb-12">
        <ProjectsGrid projects={projects} />
      </div>

      <div className="text-center text-gray-500 dark:text-gray-400">
        <p>Interested in collaborating on a research project? Feel free to reach out!</p>
      </div>
    </div>
  );
}
