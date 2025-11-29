import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog"; //
import { projects } from "@/data/projects"; //

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://htawsif.vercel.app/"; // REPLACE THIS with your actual domain

  // 1. Get all blog posts
  const posts = await getAllPosts();
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 2. Get all projects
  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 3. Define static pages
  const routes = [
    "",
    "/about",
    "/projects",
    "/experience",
    "/publications",
    "/blog",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return [...routes, ...blogUrls, ...projectUrls];
}
