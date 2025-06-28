import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug, markdownToHtml } from "@/lib/blog";
import { Calendar, ArrowLeft } from "lucide-react";

// This function tells Next.js which pages to build
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// This function fetches post data and renders the page
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Converts the markdown content of your post to HTML
  const contentHtml = await markdownToHtml(post.content || "");

  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      {/* Back to Blog Link */}
      <Link
        href="/blog"
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blog
      </Link>

      <article>
        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center text-sm text-foreground/60">
            <Calendar className="w-4 h-4 mr-1.5" />
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </header>

        {/* Article Content Rendered from Markdown */}
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </main>
  );
}
