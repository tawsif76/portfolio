import { Briefcase, FlaskConical } from "lucide-react";

export default function ExperiencePage() {
  const workExperience = [
    {
      role: "Software Engineering Trainee",
      company: "Rilo IT Ltd",
      duration: "December 2024 - January 2025",
      technologies: ["Next.js", "React", "JavaScript", "MongoDB"],
      description: [
        "Developed the Add Employee module with role-based access and automatic secure password generation for employee onboarding.",
        "Collaborated with a 7-member team to deliver 8+ features using Git and a feature-based folder structure.",
      ],
    },
  ];

  const researchExperience = [
    {
      title: "Blockchain-enabled Internet Voting: TCP/IP vs. NDN Analysis",
      technologies: ["C/C++", "ns-3", "ndnSIM"],
      description: [
        "Implemented performance measurement logic showing NDN’s 38.1% lower delay, 81% fewer packet drops, and 1.67× higher throughput compared to TCP/IP.",
        "Enhanced blockchain with SHA256 hashing, nonce-based Proof of Work, and block consistency checks.",
      ],
    },
    {
      title: "Forged Message Detection in Vehicular Named Data Networking",
      technologies: ["C/C++", "ns-3", "ndnSIM"],
      description: [
        "Designed a PBFT-based consortium blockchain system with cryptographic vehicle registration for secure identity management.",
        "Proposed spatio-temporal clustering and trust-weighted credibility scoring to classify messages and update vehicle reputations.",
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 mt-4 py-8 text-foreground">
      {/* Work Experience Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
          <Briefcase className="mr-3 text-blue-500" size={28} />
          Work Experience
        </h2>
        <div className="relative">
          {/* THEME-AWARE: Timeline vertical bar */}
          <div className="absolute left-3 top-2 w-0.5 h-full bg-slate-200 dark:bg-slate-700"></div>
          {workExperience.map((exp) => (
            <div key={exp.role} className="relative pl-10 mb-10">
              {/* THEME-AWARE: Timeline Dot */}
              <div className="absolute left-0 top-1.5 w-6 h-6 bg-background rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  {exp.role}
                </h3>
                <p className="font-medium text-blue-600 dark:text-blue-400">
                  {exp.company}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                  {exp.duration}
                </p>
                <ul className="space-y-2 list-disc pl-5 mb-4 text-slate-700 dark:text-slate-300">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    // THEME-AWARE: Technology Tags
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Research Experience Section */}
      <section>
        <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
          <FlaskConical className="mr-3 text-green-500" size={28} />
          Research Experience
        </h2>
        <div className="relative">
          {/* THEME-AWARE: Timeline vertical bar */}
          <div className="absolute left-3 top-2 w-0.5 h-full bg-slate-200 dark:bg-slate-700"></div>
          {researchExperience.map((exp) => (
            <div key={exp.title} className="relative pl-10 mb-10">
              {/* THEME-AWARE: Timeline Dot */}
              <div className="absolute left-0 top-1.5 w-6 h-6 bg-background rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  {exp.title}
                </h3>
                <ul className="space-y-2 list-disc pl-5 my-3 text-slate-700 dark:text-slate-300">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    // THEME-AWARE: Technology Tags
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
