// src/app/projects/[slug]/page.tsx
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProjectPage(props: any) {
  const { params } = (await props) as { params: Promise<{ slug: string }> }; // Fix for Next.js 15+ async params
  const { slug } = await params;

  const project: Project | undefined = projects.find(
    (p: Project) => p.slug === slug
  );

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          href="/projects"
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        <article className="bg-card text-card-foreground rounded-2xl shadow-sm border border-border overflow-hidden">
          {/* Header */}
          <div className="relative h-64 md:h-80 bg-muted">
            <Image
              src={project.image || "/images/projects/placeholder.jpg"}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <div className="flex items-center gap-4 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-sm border border-white/30">
                  {project.category}
                </span>
                <span className="flex items-center text-sm text-white/80">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(project.date).getFullYear()}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {project.title}
              </h1>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Content: Bullet Points */}
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <div className="w-1 h-6 bg-blue-500 rounded mr-3"></div>
                Key Highlights
              </h2>
              <ul className="space-y-4">
                {project.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-start text-lg text-muted-foreground"
                  >
                    <span className="mr-3 mt-2 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>

            {/* Tech Stack */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Links */}
            {project.githubUrl && (
              <section className="pt-6 border-t border-border">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-sm"
                >
                  <Github className="w-5 h-5 mr-2" />
                  View Source Code
                </a>
              </section>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
