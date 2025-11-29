import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getPostBySlug, markdownToHtml } from "@/lib/blog";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import CodeBlockManager from "@/components/CodeBlockManager";

// Generate static paths
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Academic Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const contentHtml = await markdownToHtml(post.content || "");
  const allPosts = await getAllPosts();

  // Get related posts (excluding current post)
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .filter((p) => p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3);

  // If no related posts by tags, get recent posts
  const suggestedPosts =
    relatedPosts.length > 0
      ? relatedPosts
      : allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const categoryColors: { [key: string]: string } = {
    "Network Security":
      "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300 border-red-100 dark:border-red-900",
    "Machine Learning":
      "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 border-purple-100 dark:border-purple-900",
    Blockchain:
      "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 border-green-100 dark:border-green-900",
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-blue-100 dark:selection:bg-blue-900/30">
      <CodeBlockManager />

      {/* Main Container - Constrained width for readability */}
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        {/* Minimal Navigation */}
        <nav className="mb-12">
          <Link
            href="/blog"
            className="group inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Articles
          </Link>
        </nav>

        <main>
          <article>
            {/* Header Section */}
            <header className="mb-10 md:mb-14 text-center">
              {/* Categories */}
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 text-xs font-medium rounded-full border ${
                      categoryColors[tag] ||
                      "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-100 dark:border-gray-800"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Data */}
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <div className="w-1 h-1 rounded-full bg-border" />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </header>

            {/* Featured Image - Cinematic width */}
            {post.image && (
              <div className="relative aspect-[2/1] md:aspect-[21/9] w-full mb-12 md:mb-16 rounded-2xl overflow-hidden shadow-sm border border-border/50">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Article Content - Centered Prose */}
            <div
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-xl prose-img:shadow-sm"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </article>
        </main>

        {/* Divider */}
        <hr className="my-16 md:my-24 border-border" />

        {/* Related Posts Section */}
        {suggestedPosts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight">
                Continue Reading
              </h2>
              <Link
                href="/blog"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all articles
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {suggestedPosts.map((relatedPost) => (
                <div key={relatedPost.slug} className="h-full">
                  <BlogCard
                    slug={relatedPost.slug}
                    title={relatedPost.title}
                    excerpt={relatedPost.excerpt}
                    date={relatedPost.date}
                    readTime={relatedPost.readTime}
                    category={relatedPost.tags?.[0] || "General"}
                    image={relatedPost.image}
                    icon={<Clock className="w-4 h-4" />} // Simple fallback icon
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
