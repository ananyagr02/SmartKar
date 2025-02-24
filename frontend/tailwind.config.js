/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // Ensure Tailwind scans your files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // Example: Deep Blue
        secondary: "#F97316", // Example: Orange
        customBg: "#F3F4F6", // Example: Light Gray
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        noto: ["Noto Serif", "serif"],
      },
    },
  },
  plugins: [],
};
