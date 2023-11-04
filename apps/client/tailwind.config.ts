import type { Config } from "tailwindcss";
import formPlugin from "@tailwindcss/forms";
import config from "../../packages/tailwind-config/tailwind.config";

export default {
  ...config,
  plugins: [formPlugin],
} satisfies Config;
