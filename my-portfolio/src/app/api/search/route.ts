import { NextResponse } from "next/server";
import { getAllPosts, BlogPost } from "@/lib/blog";
import { projects } from "@/data/projects";

export async function GET() {
  try {
    const posts: BlogPost[] = await getAllPosts();
    const allProjects = projects;

    const searchData = [
      ...posts.map((post) => ({
        type: "Blog",
        title: post.title,
        url: `/blog/${post.slug}`,
      })),
      ...allProjects.map((project) => ({
        type: "Project",
        title: project.title,
        // Fallback to GitHub URL or home if report is missing
        url: project.reportUrl || project.githubUrl || "#",
      })),
    ];

    return NextResponse.json(searchData);
  } catch (error) {
    console.error("Search API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
