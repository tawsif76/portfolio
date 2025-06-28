import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug, markdownToHtml } from "@/lib/blog";
import { Calendar, ArrowLeft } from "lucide-react";

// Generate static paths
export async function generateStaticParams() {
  const posts = await getAllPosts(); // await if async
  return posts.map((post) => ({ slug: post.slug }));
}

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug); // await if async

  if (!post) {
    notFound();
  }

  const contentHtml = await markdownToHtml(post.content || "");

  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <Link
        href="/blog"
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blog
      </Link>

      <article>
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

        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </main>
  );
}
