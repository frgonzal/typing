import { g } from "framer-motion/client";
import { Monofett } from "next/font/google";
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
        primary: "var(--primary)",
        white: "var(--white)",
        red: "var(--red)",
        yellow: "var(--yellow)",
        green: "var(--green)",
        "smooth-white": "var(--smooth-white)",
      },

      fontFamily: {
        sans: "var(--font-geist-sans)",
        mono: "var(--font-geist-mono)",
        monofett: "var(--font-monofett)",
      },

      keyframes: {
        "resize-width": {
          "0%": { width: "0px" },
          "100%": { width: "100%" }
        },
        "blink": {
          "0%, 100%": { opacity: "1.0" },
          "10%, 90%": { opacity: "0.8" },
          "20%, 80%": { opacity: "0.6" },
          "30%, 70%": { opacity: "0.4" },
          "40%, 60%": { opacity: "0.2" },
          "50%": { opacity: "0.0" },
        },
        correct: {
          "0%": { color: "var(--smooth-white)" },
          "100%": { color: "var(--white)" }
        }
      },

      animation: {
        "resize-width": "resize-width 1s ease-in-out",
        "blink": "blink 1s step-end infinite",
        correct: "correct 0.05s ease-in-out",
      },

    },
  },
  plugins: [],
} satisfies Config;
