'use client';

import Image from 'next/image';
import { Calendar, ExternalLink } from 'lucide-react';
import type { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const handleCardClick = () => {
    window.location.href = `/projects/${project.slug}`;
  };

  return (
    <article className="group bg-white dark:bg-gray-900/50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:-translate-y-1 cursor-pointer flex flex-col h-full">
      <div className="relative h-48 overflow-hidden flex-shrink-0" onClick={handleCardClick}>
        <Image
          src={project.image || '/images/projects/placeholder.jpg'}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col" onClick={handleCardClick}>
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">
            {new Date(project.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long'
            })}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm flex-1 overflow-hidden">
          <span className="block" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {project.shortDescription}
          </span>
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, 3).map((tech: string) => (
            <span 
              key={tech} 
              className="px-2.5 py-1 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-700 truncate"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="px-2.5 py-1 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-700">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
            View Project →
          </span>
          
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex-shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
