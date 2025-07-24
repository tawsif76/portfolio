import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  categoryColor?: string;
  image?: string;
  icon: React.ReactNode;
  isRecent?: boolean;
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  date,
  readTime,
  category,
  categoryColor = "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  image,
  icon,
  isRecent = false,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block h-full"
    >
      <article className={`bg-white dark:bg-gray-900/50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:-translate-y-2 h-full flex flex-col ${isRecent ? 'ring-2 ring-blue-500/20 dark:ring-blue-400/20' : ''}`}>
        {/* Image Section */}
        <div className="relative h-48 sm:h-52 overflow-hidden flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <div className="text-blue-400 dark:text-blue-300 group-hover:scale-110 transition-transform duration-300">
                {icon}
              </div>
            </div>
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Recent badge */}
          {isRecent && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center px-2.5 py-1 bg-blue-500 text-white text-xs font-medium rounded-full shadow-lg">
                New
              </span>
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-full backdrop-blur-sm border border-white/20 ${categoryColor}`}>
              <span className="mr-1.5">{icon}</span>
              {category}
            </span>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-3 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{new Date(date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
          </div>
          
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight line-clamp-2 flex-shrink-0">
            {title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base leading-relaxed line-clamp-3 flex-1">
            {excerpt}
          </p>
          
          {/* Read more */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
              Read Article
            </span>
            <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>
      </article>
    </Link>
  );
}
