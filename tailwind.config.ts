import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        resource: {
          // Navigation and structure
          folder: "#60A5FA", // blue-400
          repo: "#60A5FA", // blue-400
          // Workload resources
          workload: "#4ADE80", // green-400
          // Configuration resources
          config: "#FBBF24", // amber-400
          // Deployment tools
          deployment: "#C084FC", // purple-400
          // Default/other resources
          default: "#9CA3AF", // gray-400
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
