import { BookOpen } from "lucide-react";

export default function PublicationsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
      <BookOpen className="w-16 h-16 mb-4 text-slate-500" strokeWidth={1.5} />
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Yet to Publish
      </h1>
      <p className="text-lg text-foreground/70 max-w-md">
        My research and publications will be listed here as soon as they are
        available. Please check back later!
      </p>
    </div>
  );
}
