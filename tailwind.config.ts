import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "prime-orange": "#FC4747",
        "prime-black": "#10141E",
        "prime-gray": "#5A698F",
        "prime-dark": "#161D2F",
      },
      screens: {
        xs: "400px",
        sm: "600px",
        md: "768px",
        lg: "900px",
        xl: "1024px",
        "2xl": "1280px",
        "3xl": "1536px",
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
export default config;
