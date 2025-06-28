// In app/blog/page.tsx

import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Rss, ShieldCheck, GitBranch } from "lucide-react";
import BlogCard from "@/components/BlogCard";

export default function BlogPage() {
  const allPosts = getAllPosts();

  const categoryIcons: { [key: string]: React.ReactNode } = {
    "Network Security": <ShieldCheck className="w-12 h-12 text-slate-500" />,
    "Machine Learning": <GitBranch className="w-12 h-12 text-slate-500" />,
    // Add other categories as needed
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      style={{
        backgroundImage:
          "radial-gradient(circle at top left, rgba(29, 78, 216, 0.08), transparent 25%)",
      }}
    >
      {/* Page Header */}
      <div className="relative text-center mb-16 py-8 border border-slate-200 dark:border-slate-700/50 rounded-2xl bg-slate-100/30 dark:bg-slate-800/20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-repeat opacity-[0.03] dark:opacity-[0.02]"></div>
        <Rss className="w-12 h-12 text-blue-500 mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Sharing My Insights
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Reflections on Computer network and security, Blockchain etc.
        </p>
      </div>

      {/* All Posts Grid */}
      <section>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            All Posts
          </h2>
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
              image={post.image} // <-- Pass the image property here
              icon={categoryIcons[post.tags?.[0]] || <Rss />}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
