import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm': {
          '100': '#0A0A0B',
          '200': '#111212',
          '300': '#161717',
          '400': '#1A1A1B',
          '500': '#1F1F20',
          '600': '#0F0F10',
          '700': '#6b6b6b',
          'pink': '#abae94ff',
          'border': '#1A1A1B',
          'card-border': '#1F1F20',
          'secondary': '#919191',
          'dim': '#0D0D0E',
          'discord': '#5865F2',
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;