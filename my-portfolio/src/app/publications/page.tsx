import { BookOpen, FileText, Code } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Research & Publications | Academic Portfolio",
  description:
    "A collection of my research papers, ongoing projects, and publications in network security and distributed systems.",
};

export default function PublicationsPage() {
  const publications = [
    {
      id: 1,
      title:
        "A Greedy Relay Selection Approach for Push-Based Critical Data Dissemination in Vehicular Named Data Networking",
      status: "Ongoing",
      statusColor:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      links: [
        // { label: "Paper", href: "#", icon: FileText },
        // { label: "Code", href: "#", icon: Code },
      ],
    },
    {
      id: 2,
      title:
        "Secure VNDN: Detecting Deceptive Malicious Vehicles via Blockchain and Off-Chain FMD",
      status: "Under Review",
      statusColor:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
      links: [
        {
          label: "Paper",
          href: "https://drive.google.com/file/d/1i-eYkA-66l3JA1K01CramEbbHJDAFFaD/view?usp=sharing",
          icon: FileText,
        },
        {
          label: "Code",
          href: "https://github.com/tawsif76/VNDN-BC",
          icon: Code,
        },
      ],
    },
    {
      id: 3,
      title:
        "Blockchain-Enabled Internet Voting: Comparative Analysis between TCP/IP and NDN",
      status: "Unpublished",
      statusColor:
        "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700",
      links: [
        {
          label: "Paper",
          href: "https://drive.google.com/file/d/1PVTmgvVrLihLH92mpbyOlRuPJ9NrlnCB/view?usp=sharing",
          icon: FileText,
        },
        {
          label: "Code",
          href: "https://github.com/tawsif76/RF-Block-App",
          icon: Code,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Simple Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
            {/* Research & Publications */}
          </h1>
        </div>

        {/* Publications List */}
        <div className="space-y-6">
          {publications.map((pub) => (
            <div
              key={pub.id}
              className="bg-card text-card-foreground rounded-xl p-6 md:p-8 border border-border hover:border-blue-200 dark:hover:border-blue-900 transition-colors shadow-sm"
            >
              <div className="flex flex-col gap-4">
                {/* Title and Status */}
                <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-4 justify-between">
                  <h2 className="text-lg md:text-xl font-semibold leading-snug">
                    <span className="text-muted-foreground mr-2 font-mono text-sm">
                      [{pub.id}]
                    </span>
                    {pub.title}
                  </h2>
                  <span
                    className={`self-start flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${pub.statusColor}`}
                  >
                    {pub.status}
                  </span>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {pub.links.map((link, i) => (
                    <Link
                      key={i}
                      href={link.href}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md text-sm font-medium transition-colors"
                    >
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
