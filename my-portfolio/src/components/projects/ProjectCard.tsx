"use client";

import Image from "next/image";
import { ExternalLink, Github, FileText } from "lucide-react";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Open the report URL in a new tab ONLY when the button is clicked
  const handleReportClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.reportUrl) {
      window.open(project.reportUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <article className="group bg-white dark:bg-gray-900/50 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-default">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
        <Image
          src={project.image || "/images/projects/placeholder.jpg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded-full">
              {project.category}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(project.date).getFullYear()}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
        </div>

        {/* Bullet Points Highlights */}
        <ul className="space-y-2 mb-6 flex-1">
          {project.highlights.map((point, index) => (
            <li
              key={index}
              className="flex items-start text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              <span className="mr-2 mt-1.5 w-1 h-1 bg-gray-400 rounded-full flex-shrink-0"></span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] uppercase tracking-wider font-semibold rounded border border-gray-200 dark:border-gray-700"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions Footer */}
        <div className="pt-4 mt-auto border-t border-gray-100 dark:border-gray-800 flex items-center justify-between min-h-[53px]">
          {project.reportUrl ? (
            <button
              onClick={handleReportClick}
              className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline decoration-blue-600/30 underline-offset-4"
            >
              <FileText className="w-4 h-4 mr-2" />
              View Report
            </button>
          ) : (
            <div></div> // Spacer to keep GitHub aligned right
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              onClick={(e) => e.stopPropagation()} // Prevent bubbling
              title="View Code on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
