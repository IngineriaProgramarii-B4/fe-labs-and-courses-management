/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    backgroundColor: (theme) => ({
      ...theme("colors"),
      buttonBlue: "#216bc4",
      hoverBlue: "#6497d6",
    }),
  },
  plugins: [],
};
