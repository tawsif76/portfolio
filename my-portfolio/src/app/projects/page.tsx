import type { Metadata } from "next";
import { projects } from "@/data/projects";
import ProjectsGrid from "@/components/projects/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects | Network Simulations & Machine Learning", // More descriptive than just "Projects"
  description:
    "Explore academic projects in TCP/IP, NDN, ns-3 simulations, ndnSIM, SUMO, openstreetmap and Full Stack development by Mohammed Sydul Hasan Tawsif.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/10">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Projects
          </h1>
        </div>

        <ProjectsGrid projects={projects} />
      </div>
    </div>
  );
}
