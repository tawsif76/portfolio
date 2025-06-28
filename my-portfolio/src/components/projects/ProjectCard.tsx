'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Github } from 'lucide-react';
import type { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
      <div className="relative h-48 w-full">
        <Image
          src={project.image || '/images/projects/placeholder.jpg'}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {project.shortDescription}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech: string) => (
            <span 
              key={tech} 
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(project.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short'
            })}
          </span>
          <div className="flex space-x-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={20} />
              </a>
            )}
            <Link 
              href={`/projects/${project.slug}`} 
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              Read more →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
