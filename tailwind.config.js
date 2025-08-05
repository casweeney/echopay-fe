/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["ClashDisplay", "sans-serif"],
        grotesk: ["ClashGrotesk", "sans-serif"],
        minecraft: ["Minecraft", "monospace"],
        dmsans: ["var(--font-dm-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
