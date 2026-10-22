import type {
  Experience,
  Project,
  SkillCategory,
  Education,
  Certification,
} from "./types";

export const EXPERIENCES: Experience[] = [
  {
    id: "exp1",
    role: "Full Stack Engineer",
    company: "NACTA/NIFTAC | Full-Time / Intern | On-Site",
    period: "Jan 2026 — Present",
    description: [
      "Contributing to secure and scalable digital systems for mission-critical operations in a federal government organization.",
      "Responsible for end-to-end web application development, backend services, and frontend interface implementation.",
      "Developing and maintaining full-stack web applications using the MERN stack with a focus on scalable and secure architecture.",
      "Building and optimizing backend APIs and services for high-performance data processing and system reliability.",
      "Designing interactive dashboards for real-time data monitoring, reporting, and administrative control systems.",
      "Working on database design and optimization to ensure data integrity, efficiency, and scalability.",
      "Ensuring adherence to security standards and best practices for sensitive and mission-critical systems.",
    ],
  },
  {
    id: "exp2",
    role: "Full-Stack Web Developer",
    company: "Project Starlit M3 | Full-Time | Remote",
    period: "Oct 2025 — Dec 2025",
    description: [
      "Worked on a startup-grade AI-powered platform, building scalable systems and intelligent workflows.",
      "Developed modern web applications integrated with AI tools using Google Gemini and other AI services.",
      "Built full-stack applications using MERN stack (MongoDB, Express.js, React.js, Node.js) with scalable architecture.",
      "Developed AI-powered tools and workflows using Google Gemini (Google AI Studio) for intelligent user experiences.",
      "Integrated Stripe-based credit system for secure payments, usage tracking, and subscription-style monetization.",
      "Worked with modern backend services including Firebase, Supabase, and Neon for scalable data and authentication systems.",
      "Designed and optimized APIs and backend logic for high-performance and real-time applications.",
      "Collaborated in a fast-paced remote startup environment, delivering production-ready features efficiently.",
    ],
  },
  {
    id: "exp3",
    role: "Full-Stack Web Developer",
    company: "Evoxty Marketing Agency, Chakwal | Full-Time | On-Site",
    period: "July 2024 — Sept 2025",
    description: [
      "Developed and maintained scalable MERN stack applications, delivering secure and high-performance web solutions.",
      "Built advanced platforms including MLM investment systems, affiliate programs, and P2P transaction modules.",
      "Developed scalable web applications using MongoDB, Express.js, React.js, and Node.js.",
      "Built an MLM Investment Platform with automated ROI distribution, referral tracking, and wallet management.",
      "Developed an Affiliate & P2P System with real-time wallet synchronization and secure transactions.",
      "Designed and integrated RESTful APIs for efficient frontend-backend communication.",
      "Optimized application performance through debugging, refactoring, and best coding practices.",
      "Managed version control and team collaboration using Git/GitHub and supported CI/CD workflows.",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "proj1",
    title: "Enterprise E-Commerce Hub",
    problem:
      "Retailers faced significant latency and lack of real-time inventory synchronization during high-traffic shopping periods.",
    solution:
      "Engineered a real-time commerce engine utilizing Redux Toolkit for atomic state management.",
    architecture:
      "Full-stack MERN and Stripe for global transaction processing.",
    stack: ["React", "Redux Toolkit", "Node.js", "Stripe", "& more"],
    challenges:
      "Solving race conditions in stock updates and implementing secure, resilient checkout pipelines.",
    links: {
      github: "https://github.com/sabiralidev/ECom",
      live: "https://e-com-sabir-dev.vercel.app",
    },
  },
  {
    id: "proj2",
    title: "AI World Tech Platform",
    problem:
      "Users lacked a secure and transparent system to manage ROI-based investments, referral earnings, and wallet balances within a single unified platform.",
    solution:
      "Built a full-featured investment application enabling users to invest funds, earn daily ROI, track MLM referral rewards, and manage balances through an internal wallet system with admin-controlled approvals.",
    architecture:
      "Complete MERN stack architecture with role-based access control, RESTful APIs, secure transaction flows, and optimized frontend state management for real-time updates.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Corn Job"],
    challenges:
      "Implementing accurate ROI calculations, secure wallet transactions, MLM referral logic, and maintaining data consistency while preventing duplicate payouts and unauthorized actions.",
    links: {
      github: "https://github.com/sabiralidev/Crypto-Roi",
      live: "https://crypto-roi-client.vercel.app",
    },
  },
];

export const SKILLS: SkillCategory[] = [
  {
    title: "Frontend Engine",
    skills: [
      "React 19",
      "TypeScript",
      "Next.js (App Router)",
      "Tailwind CSS",
      "Framer Motion",
      "TanStack Query",
      "Redux Toolkit",
      "React Hook Form",
    ],
  },
  {
    title: "Backend Systems",
    skills: [
      "Node.js",
      "Express.js",
      "RESTful APIs",
      "JWT & OAuth Authentication",
      "Firebase & Supabase",
      "Neon DB",
      "Serverless Functions",
      "Microservices Architecture",
    ],
  },
  {
    title: "Infrastructure",
    skills: [
      "MongoDB",
      "PostgreSQL",
      "Caching Strategies",
      "Vercel / Netlify Deployment",
      "Git / GitHub Workflows",
      "CI/CD Pipelines",
      "VPS Hosting & Nginx",
    ],
  },
  {
    title: "Engineering Tools",
    skills: [
      "Google Gemini (AI Studio)",
      "Postman / Insomnia",
      "VS Code",
      "React Query",
      "Cloudinary / Media Management",
      "Bcrypt",
      "Axios / Fetch API",
      "GoHighLevel",
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    institution: "The Superior College",
    degree: "Intermediate/ Computer Science",
    period: "2021 — Dropout",
  },
  {
    institution: "Jinnah Public High School",
    degree: "Matriculation/ Computer Science",
    period: "2019 — 2021",
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "Full Stack Web Developer Certification",
    issuer: "Ehunar Organization",
    date: "2023",
  },
  {
    name: "MERN Stack Development Specialist",
    issuer: "NexusBerry Training & Solutions",
    date: "2024",
  },
];
