import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getPostBySlug, markdownToHtml } from "@/lib/blog";
import { Calendar, ArrowLeft, Clock, Tag, User, Share2, BookOpen, ArrowRight } from "lucide-react";
import BlogCard from "@/components/BlogCard";

// Generate static paths
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Academic Blog`,
    description: post.excerpt,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function BlogPostPage(props: any) {
  const { params } = props as { params: { slug: string } };
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const contentHtml = await markdownToHtml(post.content || "");
  const allPosts = await getAllPosts();
  
  // Get related posts (excluding current post)
  const relatedPosts = allPosts
    .filter(p => p.slug !== params.slug)
    .filter(p => p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3);

  // If no related posts by tags, get recent posts
  const suggestedPosts = relatedPosts.length > 0 
    ? relatedPosts 
    : allPosts.filter(p => p.slug !== params.slug).slice(0, 3);

  const categoryColors: { [key: string]: string } = {
    "Network Security": "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300",
    "Machine Learning": "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300", 
    "Blockchain": "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/10">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Navigation */}
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto">
          <article className="bg-white dark:bg-gray-900/50 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            {/* Post Header */}
            <header className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-800">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full ${categoryColors[tag] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                {post.title}
              </h1>

              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Academic Author</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Share button */}
              <div className="flex items-center gap-3">
                <button className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </button>
              </div>
            </header>

            {/* Post Image */}
            {post.image && (
              <div className="relative h-64 sm:h-80 lg:h-96">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Post Content */}
            <div className="p-6 sm:p-8">
              <div
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </div>
          </article>
        </main>

        {/* Related Posts */}
        {suggestedPosts.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded"></div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {relatedPosts.length > 0 ? 'Related Articles' : 'Recent Articles'}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">Continue exploring</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {suggestedPosts.map((relatedPost) => (
                <BlogCard
                  key={relatedPost.slug}
                  slug={relatedPost.slug}
                  title={relatedPost.title}
                  excerpt={relatedPost.excerpt}
                  date={relatedPost.date}
                  readTime={relatedPost.readTime}
                  category={relatedPost.tags?.[0] || "General"}
                  categoryColor={categoryColors[relatedPost.tags?.[0]] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"}
                  image={relatedPost.image}
                  icon={<BookOpen className="w-5 h-5" />}
                />
              ))}
            </div>

            {/* View all posts */}
            <div className="text-center mt-12">
              <Link 
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                View All Posts
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
