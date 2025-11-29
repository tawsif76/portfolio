// src/app/page.tsx
import Hero from "@/components/Hero";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohammed Sydul Hasan Tawsif",
    url: "https://your-domain.vercel.app",
    jobTitle: "Research Assistant",
    alumniOf: "Chittagong University of Engineering and Technology",
    sameAs: [
      "https://github.com/tawsif76",
      "https://www.linkedin.com/in/sydul-hasan-tawsif-16037a307/",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
    </>
  );
}
