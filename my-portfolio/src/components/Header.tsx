"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search, Moon, Sun, FileText, Newspaper } from "lucide-react";
import { useTheme } from "next-themes";

interface SearchResult {
  type: string;
  title: string;
  url: string;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);

  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Fetch search data when modal opens
  useEffect(() => {
    if (isSearchOpen && searchData.length === 0) {
      fetch("/api/search")
        .then((res) => res.json())
        .then((data) => setSearchData(data))
        .catch((err) => console.error("Failed to fetch search data:", err));
    }
  }, [isSearchOpen, searchData.length]);

  // Filter results based on query
  useEffect(() => {
    if (searchQuery.length > 1) {
      const results = searchData.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [searchQuery, searchData]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/experience" },
    { name: "Publications", href: "/publications" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="bg-background/80 backdrop-blur-sm text-foreground border-b border-slate-200 dark:border-slate-700 w-full transition-colors fixed top-0 left-0 right-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold">
              {/* Tawsif */}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hover:text-blue-600 transition-colors"
                aria-label="Open search"
              >
                <Search size={20} />
              </button>
              {mounted && (
                <button
                  onClick={() =>
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                  }
                  className="hover:text-blue-600 transition-colors"
                  aria-label="Toggle Dark Mode"
                >
                  {resolvedTheme === "dark" ? (
                    <Sun size={20} />
                  ) : (
                    <Moon size={20} />
                  )}
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background rounded-lg mt-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          ></div>
          <div
            className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-2xl mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search blog posts and projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent pl-12 pr-4 py-4 text-lg text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            {filteredResults.length > 0 && (
              <ul className="border-t border-slate-200 dark:border-slate-700 max-h-96 overflow-y-auto">
                {filteredResults.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.url}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-4 p-4 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      {item.type === "Blog" ? (
                        <Newspaper className="w-5 h-5 text-slate-500" />
                      ) : (
                        <FileText className="w-5 h-5 text-slate-500" />
                      )}
                      <span className="text-slate-700 dark:text-slate-200">
                        {item.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {searchQuery.length > 1 && filteredResults.length === 0 && (
              <div className="p-10 text-center text-slate-500">
                No results found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
