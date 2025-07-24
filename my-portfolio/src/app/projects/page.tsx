import type { Metadata } from "next";
import { projects } from "@/data/projects";
import ProjectsGrid from "@/components/projects/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects | Academic Portfolio",
  description:
    "Explore my academic and research projects in computer science and networking.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/10">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Academic Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A collection of research projects in computer science, networking, and machine learning
          </p>
        </div>

        <ProjectsGrid projects={projects} />
      </div>
    </div>
  );
}
