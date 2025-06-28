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
        url: `/projects/${project.slug}`,
      })),
    ];

    return NextResponse.json(searchData);
  } catch (error) {
    // Log the error for debugging
    console.error("Search API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
