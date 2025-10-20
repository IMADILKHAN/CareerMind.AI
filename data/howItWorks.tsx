import { UserPlus, FileEdit, Users, LineChart } from "lucide-react";

export const howItWorks = [
  {
    title: "Professional Onboarding",
    description:
      "Start by sharing your background and career goals. Our AI instantly tailors guidance to fit your unique journey.",
    icon: <UserPlus className="w-8 h-8 text-primary" />,
  },
  {
    title: "Craft Winning Documents",
    description:
      "Build polished, ATS-optimized resumes and persuasive cover letters that grab attention in seconds.",
    icon: <FileEdit className="w-8 h-8 text-primary" />,
  },
  {
    title: "Master Your Interviews",
    description:
      "Practice with realistic AI-driven mock interviews designed to mirror real-world scenarios and roles.",
    icon: <Users className="w-8 h-8 text-primary" />,
  },
  {
    title: "Track & Optimize",
    description:
      "Monitor your progress with powerful analytics, insights, and personalized improvement paths.",
    icon: <LineChart className="w-8 h-8 text-primary" />,
  },
];
