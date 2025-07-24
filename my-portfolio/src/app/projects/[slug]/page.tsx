import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Github, ArrowLeft, ExternalLink, Calendar, Tag } from "lucide-react";
import { projects } from "@/data/projects";
import type { Project } from "@/types/project";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// The 'props' are typed as 'any' to bypass the incorrect auto-generated types from Next.js.
// We then create a correctly typed 'params' object for use within the component.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectPage(props: any) {
  const { params } = props as { params: { slug: string } };
  const project: Project | undefined = projects.find(
    (p: Project) => p.slug === params.slug
  );

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link
          href="/projects"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <header className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 md:p-12">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  <Tag className="w-4 h-4 mr-2" />
                  {project.category}
                </span>
                <span className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(project.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {project.title}
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed max-w-3xl">
                {project.shortDescription}
              </p>
            </div>
          </header>

          <div className="relative">
            <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
              <Image
                src={project.image || "/images/projects/placeholder.jpg"}
                alt={project.title}
                fill
                className="object-cover transition-transform hover:scale-105 duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            <section>
              <div className="prose dark:prose-invert max-w-none">
                {project.longDescription.map(
                  (paragraph: string, index: number) => (
                    <p
                      key={index}
                      className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-6"
                    >
                      {paragraph}
                    </p>
                  )
                )}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded mr-4"></div>
                Tech Stack
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {project.techStack.map((tech: string) => (
                  <div
                    key={tech}
                    className="group bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4 text-center hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <span className="font-medium text-blue-700 dark:text-blue-300 group-hover:text-blue-800 dark:group-hover:text-blue-200">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded mr-4"></div>
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.features.map((feature: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl hover:shadow-md transition-shadow"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {project.githubUrl && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded mr-4"></div>
                  Project Links
                </h2>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-xl hover:bg-gray-800 dark:hover:bg-gray-600 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
                  >
                    <Github className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                    View Source Code
                  </a>
                  <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:scale-105 group">
                    <ExternalLink className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                    Live Demo
                  </button>
                </div>
              </section>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
