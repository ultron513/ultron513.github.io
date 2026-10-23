import type { Profile } from "./schema";

export const profile: Profile = {
  name: "Ashish Kumar Patra",
  shortName: "Ashish Patra",
  wordmark: "ashish",
  roles: ["Software engineer", "Data scientist", "AI and machine learning engineer"],
  headline: "Building intelligent systems, from race telemetry to research compilers.",
  introduction:
    "Aspiring software development engineer pursuing dual degrees at IIT Guwahati and IIIT Bhubaneswar, with hands-on experience building scalable software systems, full-stack applications and data-driven solutions.",
  location: { city: "Bhubaneswar", country: "India", lat: 20.2961, lon: 85.8245 },
  contact: {
    email: "ashish.patra513@gmail.com",
    linkedin: "https://www.linkedin.com/in/ashish-patra-513akp/",
    github: "https://github.com/ultron513",
  },
  competitiveProgramming: {
    leetcodeRank: "Top 0.1%",
    leetcodeSolved: "1900+",
    codeforces: "Specialist",
  },
  availability:
    "Open to software engineering, AI/ML, data, research and technical collaboration opportunities.",
  cv: { path: "/documents/Ashish_Patra_CV.pdf", fileName: "Ashish_Patra_CV.pdf" },
};
