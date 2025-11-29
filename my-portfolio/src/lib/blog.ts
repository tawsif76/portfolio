import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";

const postsDirectory = path.join(process.cwd(), "src/posts");

// Calculate read time based on word count (average 200 words per minute)
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  readTime: string;
  image?: string; // Optional image URL for the blog post
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const fileNames = await fs.readdir(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await fs.readFile(fullPath, "utf8");
      const matterResult = matter(fileContents);

      return {
        slug,
        ...(matterResult.data as Omit<
          BlogPost,
          "slug" | "content" | "readTime"
        >),
        content: matterResult.content,
        readTime: calculateReadTime(matterResult.content),
      };
    })
  );

  return allPostsData.sort((a, b) =>
    new Date(b.date) > new Date(a.date) ? 1 : -1
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as Omit<BlogPost, "slug" | "content" | "readTime">),
      content: matterResult.content,
      readTime: calculateReadTime(matterResult.content),
    };
  } catch {
    return null;
  }
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype, {
      allowDangerousHtml: true,
    })
    // Add rehypeHighlight BEFORE rehypeStringify
    // ignoreMissing: true prevents errors if a language isn't found
    .use(rehypeHighlight, { ignoreMissing: true })
    .use(rehypeKatex, {
      strict: false,
      trust: true,
      throwOnError: false,
    })
    .use(rehypeStringify, {
      allowDangerousHtml: true,
    })
    .process(markdown);

  return result.toString();
}
