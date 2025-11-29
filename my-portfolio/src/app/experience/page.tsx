import { Briefcase } from "lucide-react";

export default function ExperiencePage() {
  const workExperience = [
    {
      role: "Research Assistant",
      company: "Department of Computer Science & Engineering, CUET",
      duration: "October 2025 – Present",
      technologies: [],
      type: "research",
      description: [
        "Conducting research in computer networking with an emphasis on NDN-based vehicular communication",
        "Taught introductory sessions on ns-3, ndnSIM, and SUMO to new members of the research group",
      ],
    },
    {
      role: "Software Engineering Trainee",
      company: "Rilo IT Ltd",
      duration: "December 2024 - January 2025",
      technologies: ["Next.js", "React", "JavaScript", "MongoDB"],
      type: "work",
      description: [
        "Developed the Add Employee module with role-based access and automatic secure password generation for employee onboarding.",
        "Collaborated with a 7-member team to deliver 8+ features using Git and a feature-based folder structure.",
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
                <div
                  className={`w-3 h-3 rounded-full ${
                    exp.type === "research" ? "bg-green-500" : "bg-blue-500"
                  }`}
                ></div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  {exp.role}
                </h3>
                <p
                  className={`font-medium ${
                    exp.type === "research"
                      ? "text-green-600 dark:text-green-400"
                      : "text-blue-600 dark:text-blue-400"
                  }`}
                >
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
    </div>
  );
}
