import type { Config } from "tailwindcss";
import formPlugin from "@tailwindcss/forms";

export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [formPlugin],
} satisfies Config;
