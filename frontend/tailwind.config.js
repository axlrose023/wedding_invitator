/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        minimal: {
          bg: "#faf8f4",
          paper: "#faf8f4",
          gray: "#f5f5f5",
          text: "#111111",
          secondary: "#5d5d5d",
          muted: "#999999",
          accent: "#5d5d5d",
          dark: "#171717",
        },
      },
      fontFamily: {
        // body / labels
        sans: ["Montserrat", "system-ui", "sans-serif"],
        // big flowing hero names
        signature: ['"Great Vibes"', "cursive"],
        // thin cursive section titles ("Our big day", "Details"...)
        script: ['"Qwitcher Grypen"', "cursive"],
        serif: ['"Cormorant Garamond"', "serif"],
      },
      letterSpacing: {
        label: "0.2em",
      },
    },
  },
  plugins: [],
};
