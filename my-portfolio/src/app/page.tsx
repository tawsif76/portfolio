import Hero from "@/components/Hero";

export default function Home() {
  // This is the JSON structure you just verified
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Mohammed Sydul Hasan Tawsif",
      jobTitle: "Research Assistant",
      url: "https://htawsif.vercel.app",
      sameAs: [
        "https://github.com/tawsif76",
        "https://www.linkedin.com/in/sydul-hasan-tawsif-16037a307/",
      ],
      alumniOf: {
        "@type": "Organization",
        name: "Chittagong University of Engineering and Technology",
      },
    },
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
