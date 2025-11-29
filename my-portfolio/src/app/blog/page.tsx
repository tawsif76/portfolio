import { getAllPosts } from "@/lib/blog";
import {
  Rss,
  ShieldCheck,
  GitBranch,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import BlogCard from "@/components/BlogCard";

export const metadata = {
  title: "Blog | Academic Insights",
  description:
    "Explore insights on computer networks, security, blockchain, and emerging technologies.",
};

export default async function BlogPage() {
  const allPosts = await getAllPosts();
  const recentPosts = allPosts.slice(0, 3);
  const olderPosts = allPosts.slice(3);

  const categoryIcons: { [key: string]: React.ReactNode } = {
    "": <ShieldCheck className="w-5 h-5" />,
    "Machine Learning": <GitBranch className="w-5 h-5" />,
    Blockchain: <BookOpen className="w-5 h-5" />,
  };

  const categoryColors: { [key: string]: string } = {
    "": "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300",
    "Machine Learning":
      "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300",
    Blockchain:
      "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/10">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 dark:from-blue-400/3 dark:to-purple-400/3"></div>
        <div className="container mx-auto px-4 py-20 sm:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full mb-6">
              <BookOpen className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Technical Blog</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-8 leading-relaxed pb-2">
              {/* Insights & Research */}
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Deep dives into{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                Computer Networking
              </span>
              ,
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                {" "}
                blockchain
              </span>
              , and
              <span className="font-semibold text-green-600 dark:text-green-400">
                {" "}
                emerging technologies
              </span>
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md mx-auto mb-12">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {allPosts.length}
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">
                  Articles
                </div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                  {new Set(allPosts.flatMap((p) => p.tags)).size}
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">
                  Topics
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {/* Recent Posts Section */}
        {recentPosts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded"></div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Recent Posts
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {/* Latest insights and discoveries */}
                </p>
              </div>
              <TrendingUp className="w-6 h-6 text-blue-500 ml-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <BlogCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  readTime={post.readTime}
                  category={post.tags?.[0] || "General"}
                  categoryColor={
                    categoryColors[post.tags?.[0]] ||
                    "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  }
                  image={post.image}
                  icon={
                    categoryIcons[post.tags?.[0]] || <Rss className="w-5 h-5" />
                  }
                  isRecent={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Posts Section */}
        {olderPosts.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-teal-500 rounded"></div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  All Articles
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Complete collection of technical writings
                </p>
              </div>
              <BookOpen className="w-6 h-6 text-green-500 ml-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allPosts.map((post) => (
                <BlogCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  readTime={post.readTime}
                  category={post.tags?.[0] || "General"}
                  categoryColor={
                    categoryColors[post.tags?.[0]] ||
                    "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  }
                  image={post.image}
                  icon={
                    categoryIcons[post.tags?.[0]] || <Rss className="w-5 h-5" />
                  }
                />
              ))}
            </div>
          </section>
        )}

        {/* No Posts State */}
        {allPosts.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No posts yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Check back soon for new content!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
