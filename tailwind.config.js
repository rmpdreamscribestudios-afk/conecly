/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        conecly: {
          ink: "#142321",
          forest: "#083B37",
          teal: "#0B4E4A",
          emerald: "#5F8D73",
          amber: "#D99D44",
          cream: "#FAF7F0",
          paper: "#FCFBF7",
          mist: "#EEF4EF",
          clay: "#C16E4F",
          lilac: "#8E7CC3",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 22px 70px rgba(20, 35, 33, 0.12)",
        lift: "0 28px 80px rgba(8, 59, 55, 0.18)",
        line: "0 1px 0 rgba(20, 35, 33, 0.08)",
      },
    },
  },
  plugins: [],
};
