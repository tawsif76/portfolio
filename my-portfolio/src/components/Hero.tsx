"use client";

import Image from "next/image";
import { Mail, Github, Linkedin, FileText } from "lucide-react";

export default function Hero() {
  const userDetails = {
    fullName: "Mohammed Sydul Hasan Tawsif",
    jobTitle: "Undergraduate Student",
    institution: "Chittagong University of Engineering and Technology",
    profileImage: "/images/profile.jpeg",
    socials: [
      {
        name: "Email",
        href: "mailto:sydul.tawsif@gmail.com",
        icon: Mail,
        ariaLabel: "Email Your Full Name",
      },
      {
        name: "GitHub",
        href: "https://github.com/tawsif76",
        icon: Github,
        ariaLabel: "GitHub profile of Your Full Name",
      },
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/sydul-hasan-tawsif-16037a307/",
        icon: Linkedin,
        ariaLabel: "LinkedIn profile of Your Full Name",
      },
    ],
    aboutMeSummary: (
      <>
        <p className="mb-4">
          I’m a final-year undergraduate student in{" "}
          <strong>Computer Science and Engineering</strong> at{" "}
          <strong>Chittagong University of Engineering and Technology</strong>,
          with a strong interest in <strong>computer networking</strong> and{" "}
          <strong>security</strong>. My work spans both traditional{" "}
          <strong>TCP/IP-based systems</strong> and future Internet
          architectures like <strong>Named Data Networking (NDN)</strong>.
          Currently, I am working with blockchain-based vehicular network
          security.
        </p>
        <p className="mb-4">
          Technically, I’m proficient in <strong>C/C++</strong> and{" "}
          <strong>Python</strong>, and have experience with network simulation
          tools such as <strong>ns-3</strong> and <strong>ndnSIM</strong>, along
          with mobility simulation using <strong>SUMO</strong>.
        </p>

        <p>
          I am currently seeking{" "}
          <strong>fully funded research positions</strong> in the field of{" "}
          <strong>networking and security</strong>, particularly projects that
          involve <strong>vehicular networks</strong>, the{" "}
          <strong>Internet of Things (IoT)</strong>, or next-generation Internet
          technologies like <strong>edge computing</strong>,{" "}
          <strong>NDN</strong>, or <strong>6G-inspired architectures</strong>.
        </p>
      </>
    ),

    researchInterests: [
      "Computer Networking and Security",
      "Vehicular Ad-Hoc Networking",
      "Machine Learning",
      "Blockchain",
      "Internet of Things (IoT)",
    ],
    education: [
      {
        degree: "B.Sc. in Computer Science, 2025",
        university: "Chittagong University of Engineering and Technology",
        focus: "",
        year: "",
      },
    ],
  };

  return (
    <section className="bg-background text-foreground py-16 md:py-24 transition-colors">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Left: Profile Photo, Name, Title, Socials (Takes 1/3 width on desktop) */}
          <div className="w-full md:w-1/3 flex flex-col items-center text-center">
            <div className="relative w-44 h-44 md:w-52 md:h-52 overflow-hidden rounded-full border-4 border-foreground/20 shadow-xl bg-foreground/5">
              <Image
                src={userDetails.profileImage}
                alt={`Profile photo of ${userDetails.fullName}`}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-full"
                priority
                sizes="(max-width: 208px) 100vw, 208px"
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mt-3">
              {userDetails.fullName}
            </h1>
            <p className="text-lg text-foreground/80 mb-1">
              {userDetails.jobTitle}
            </p>
            <p className="text-md text-foreground/60 mb-4">
              {userDetails.institution}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-3 mb-3">
              {userDetails.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-blue-500 transition-colors"
                  aria-label={social.ariaLabel}
                >
                  <social.icon size={22} />
                </a>
              ))}
              {/* CV button */}
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-semibold px-4 py-1.5 rounded border border-blue-700 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-700 hover:text-white transition-colors"
                aria-label="View CV"
              >
                <FileText size={18} className="mr-2" />
                CV
              </a>
            </div>
          </div>

          {/* Right: About Me, Interests + Education (Takes 2/3 width on desktop) */}
          <div className="w-full md:w-2/3">
            <h2 className="text-3xl font-bold mb-4 text-left">About Me</h2>
            <div className="mb-8 leading-relaxed text-foreground/80">
              {userDetails.aboutMeSummary}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Interests */}
              <div>
                <h3 className="text-2xl font-bold mb-3">Interests</h3>
                <ul className="space-y-2.5">
                  {userDetails.researchInterests.map((interest, index) => (
                    <li
                      key={index}
                      className="text-foreground/80 text-lg flex items-start"
                    >
                      <span className="text-blue-500 mr-2 text-xl">›</span>
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-2xl font-bold mb-3">Education</h3>
                <ul className="space-y-4">
                  {userDetails.education.map((edu, index) => (
                    <li key={index}>
                      <div className="font-semibold text-lg">{edu.degree}</div>
                      <div className="text-foreground/60">{edu.university}</div>
                      {edu.focus && (
                        <div className="text-foreground/60 text-sm italic">
                          {edu.focus}
                        </div>
                      )}
                      <div className="text-foreground/40 text-sm">
                        {edu.year}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
