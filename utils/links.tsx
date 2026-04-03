import { AreaChart, Layers, AppWindow } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: "/add-job",
    label: "add job",
    icon: <Layers size={20} strokeWidth={2} />,
  },
  {
    href: "/jobs",
    label: "all jobs",
    icon: <AppWindow size={20} strokeWidth={2} />,
  },
  {
    href: "/stats",
    label: "stats",
    icon: <AreaChart size={20} strokeWidth={2} />,
  },
];

export default links;
