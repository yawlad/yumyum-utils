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
        pink: "#ff4477",
        "pink-light": "#ff89b5",
        orange: " #ff9900",
      },
      backgroundImage: {
        price: "url('/bg.png')",
        "price-discount": "url('/bg_2.png')",
      },
    },
  },
  plugins: [],
} satisfies Config;
