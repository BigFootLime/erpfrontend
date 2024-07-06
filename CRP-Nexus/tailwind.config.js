module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}", // Adjust the path according to your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
