// File: components/BlogCard.tsx

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image?: string; // Make image optional
  icon: React.ReactNode; // Keep icon as a fallback
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  date,
  readTime,
  category,
  image,
  icon,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="block group bg-white dark:bg-slate-800/50 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-slate-200 dark:border-slate-700 overflow-hidden"
    >
      <div className="relative w-full h-48 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="text-slate-400">{icon}</div>
        )}
      </div>
      <div className="p-5">
        <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
          {category}
        </p>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
          {excerpt}
        </p>
        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
          <Calendar className="w-3.5 h-3.5 mr-1.5" />
          <span>{new Date(date).toLocaleDateString("en-US")}</span>
          <span className="mx-2">•</span>
          <Clock className="w-3.5 h-3.5 mr-1.5" />
          <span>{readTime}</span>
        </div>
      </div>
    </Link>
  );
}
