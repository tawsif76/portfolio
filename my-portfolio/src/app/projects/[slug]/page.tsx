import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Github, ArrowLeft } from 'lucide-react';
import { projects } from '@/data/projects';
import type { Project } from '@/types/project';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project: Project | undefined = projects.find((p: Project) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link 
        href="/projects" 
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Projects
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {project.title}
          </h1>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-6">
            <span>{new Date(project.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            <span className="mx-2">•</span>
            <span>{project.category}</span>
          </div>
        </header>

        <div className="mb-8 rounded-lg overflow-hidden">
          <div className="relative w-full h-64 md:h-80 lg:h-96">
            <Image
              src={project.image || '/images/projects/placeholder.jpg'}
              alt={project.title}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          {project.longDescription.map((paragraph: string, index: number) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}

          <h2 className="text-xl font-semibold mt-8 mb-4">Key Features</h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            {project.features.map((feature: string, index: number) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.techStack.map((tech: string) => (
              <span
                key={tech}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          {project.githubUrl && (
            <div className="mt-8">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
              </a>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
