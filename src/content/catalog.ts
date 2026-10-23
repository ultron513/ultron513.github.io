import type { Achievement, Certification, Education, NavItem, SkillGroup } from "./schema";

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Certificates", href: "/certificates" },
  { label: "Contact", href: "/contact" },
];

export const skills: SkillGroup[] = [
  {
    category: "Programming languages",
    description: "Core programming and data-query languages.",
    skills: ["Python", "Java", "C++", "C", "JavaScript", "TypeScript", "SQL"],
  },
  {
    category: "Software development",
    description: "Engineering fundamentals, web frameworks and APIs.",
    skills: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "React.js",
      "Next.js",
      "FastAPI",
      "Flask",
      "HTML5",
      "CSS3",
      "REST APIs",
      "Streamlit",
    ],
  },
  {
    category: "Databases, cloud and tools",
    description: "Storage, cloud platforms, containers and developer tooling.",
    skills: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Google Cloud Platform",
      "Docker",
      "Git",
      "GitHub",
      "Linux",
      "VS Code",
      "Jupyter Notebook",
    ],
  },
  {
    category: "AI, machine learning and analytics",
    description: "Modelling, computer vision, audio and BI tooling.",
    skills: [
      "Scikit-learn",
      "TensorFlow",
      "Keras",
      "OpenCV",
      "XGBoost",
      "Librosa",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Plotly",
      "Power BI",
      "Power Query",
      "DAX",
    ],
  },
];

export const education: Education[] = [
  {
    qualification: "B.Sc. (Hons.) Data Science and AI",
    institution: "IIT Guwahati",
    board: "IIT Guwahati",
    year: "2027",
    score: "8.25 CGPA",
    level: "Undergraduate",
  },
  {
    qualification: "B.Tech. Electronics & Telecommunication Engineering",
    institution: "IIIT Bhubaneswar",
    board: "IIIT Bhubaneswar",
    year: "2028",
    score: "7.81 CGPA",
    level: "Undergraduate",
  },
  {
    qualification: "Class XII",
    institution: "DAV Public School, Unit-8, Bhubaneswar",
    board: "CBSE, New Delhi",
    year: "2023",
    score: "91.2%",
    level: "School",
  },
  {
    qualification: "Class X",
    institution: "DAV Public School, Unit-8, Bhubaneswar",
    board: "CBSE, New Delhi",
    year: "2021",
    score: "94.2%",
    level: "School",
  },
];

export const certifications: Certification[] = [
  {
    title: "Google AI Essentials",
    issuer: "Google",
    category: "Artificial intelligence",
    patch: "hex",
    image: "/images/certificates/certificate-01.webp",
  },
  {
    title: "Google Cybersecurity",
    issuer: "Google",
    category: "Cybersecurity",
    patch: "shield",
    image: "/images/certificates/certificate-02.webp",
  },
  {
    title: "Google IT Automation with Python",
    issuer: "Google",
    category: "Automation and Python",
    patch: "chevron",
    image: "/images/certificates/certificate-03.webp",
  },
  {
    title: "AWS S3 Basics",
    issuer: "Amazon Web Services",
    category: "Cloud",
    patch: "circle",
    image: "/images/certificates/certificate-04.webp",
  },
  {
    title: "GIS Mapping & Spatial Analysis",
    issuer: "Professional certification",
    category: "Geospatial analytics",
    patch: "diamond",
    image: "/images/certificates/certificate-05.webp",
  },
];

export const achievements: Achievement[] = [
  {
    metric: "Top 0.1%",
    title: "LeetCode global ranking",
    description: "Ranked among the top 0.1% of programmers globally on LeetCode.",
  },
  {
    metric: "1900+",
    title: "LeetCode problems solved",
    description:
      "Algorithmic and data-structure problems across dynamic programming, graphs, trees, greedy algorithms and binary search.",
  },
  {
    metric: "Specialist",
    title: "Codeforces rating",
    description: "Earned through consistent performance in competitive programming contests.",
  },
  {
    metric: "100+",
    title: "Students mentored",
    description: "Python mentoring through Stanford's Code in Place 2025.",
  },
];
