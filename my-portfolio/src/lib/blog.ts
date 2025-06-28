import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";

const postsDirectory = path.join(process.cwd(), "src/posts");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  readTime: string;
}

export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as Omit<BlogPost, "slug" | "content">),
      content: matterResult.content,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as Omit<BlogPost, "slug" | "content">),
      content: matterResult.content,
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
