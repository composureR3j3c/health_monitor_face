/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ important: enables .dark class toggling
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
