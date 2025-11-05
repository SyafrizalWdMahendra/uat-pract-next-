import { type Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#1a2a4f",
      },
      fontFamily: {
        sans: ["Geist Sans", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 0.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
