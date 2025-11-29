import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "1",
    title: "Machine learning model to recognize barbell exercises",
    date: "2024-01-20",
    category: "Machine Learning",
    reportUrl:
      "https://drive.google.com/file/d/1XuAxhsdIk5GcKWK6Hs7P-dqNSpTX8o58/view?usp=sharing",
    githubUrl:
      "https://github.com/tawsif76/Tracking-Barbell-Exercise-/tree/main/trackingBarbellExercise",
    image: "/images/swd.png",
    highlights: [
      "Classified barbell exercises using accelerometer and gyroscope data from wearable sensors",
      "Achieved 98% accuracy in exercise classification using random forest",
    ],
    techStack: ["Python", "Scikit-learn", "NumPy", "Pandas", "Matplotlib"],
  },

  {
    id: "2",
    title:
      "Impact Analysis of Link Failure on TCP Performance Using Rocketfuel Topology",
    date: "2024-11-10",
    category: "Network Simulation",
    // reportUrl: "",
    githubUrl: "https://github.com/tawsif76/TCP-Cubic-Link-Failure",
    image: "/images/mesh.png", // Make sure you add this image
    highlights: [
      "Designed a TCP CUBIC simulation on a Rocketfuel ISP topology in ns-3",
      "Simulated a fiber-cut event by disabling the producer’s interface with routing recomputation",
      "Measured hop count, delay, and throughput impacts",
    ],
    techStack: ["ns-3"],
  },

  {
    id: "3",
    title: "AutoX - An Automobile Workshop Maintenance system",
    date: "2023-11-15",
    category: "Full Stack",
    // reportUrl: "#",
    githubUrl: "https://github.com/tawsif76/AutoX-React2",
    image: "/images/autox.png",
    highlights: [
      "Find specific car parts with ease using user-friendly search functions",
      "Uncover nearby workshops effortlessly",
      "Make informed decisions by comparing prices across various shops for similar items",
    ],
    techStack: [
      "MongoDB",
      "React",
      "Node.js",
      "JavaScript",
      "HTML",
      "Tailwind CSS",
    ],
  },

  {
    id: "4",
    title: "Legal Aid and Legal Documents Management Website",
    date: "2023-08-10",
    category: "Full Stack",
    // reportUrl: "#",
    githubUrl: "https://github.com/tawsif76/legal-aid",
    image: "/images/legal.png",
    highlights: [
      "Includes a document generator for producing legal drafting documents",
      "Locates advocates based on user needs and location",
      "Offers free and paid tiers for legal information and assistance",
    ],
    techStack: [
      "MongoDB",
      "React",
      "Node.js",
      "JavaScript",
      "HTML",
      "Tailwind CSS",
    ],
  },
];
