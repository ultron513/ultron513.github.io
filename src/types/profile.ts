export type Profile = {
  name: string;
  shortName: string;
  roles: readonly string[];
  headline: string;
  introduction: string;
  summary: string;
  location: string;

  education: readonly string[];

  contact: {
    email: string;
    linkedin: string;
    github: string;
  };

  competitiveProgramming: {
    leetcodeRanking: string;
    codeforcesRating: string;
  };

  interests: readonly string[];

  availability: string;
};