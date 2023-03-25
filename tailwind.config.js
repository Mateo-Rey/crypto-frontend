/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        "t-sm": "0 -1px 2px 0 rgba(0, 0, 0, 0.05)",
        "t-md":
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "t-lg":
          "0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "t-xl":
          "0 -20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "t-2xl": "0 -25px 50px -12px rgba(0, 0, 0, 0.25)",
        "t-3xl": "0 -35px 60px -15px rgba(0, 0, 0, 0.3)",
        "b-sm": "0 1px -2px 0 rgba(0, 0, 0, 0.05)",
        "b-md":
          "0 4px -6px 1px rgba(0,0,0,0.1), 0 -2px -4px 1px rgba(0,0,0,0.6)",
      },
      fontFamily: { 'nunito': ["nunito", "sans-serif"] },
      colors: {
        "soft-light-blue": "#a1b7ff",
        "gradient-blue": "#879ae4",
        "shadow-blue": "#8091d7",
        "light-shadow-blue": "#adc5ff",
        "sidebar-secondary": "#bbc8ff",
        "sidebar-primary": "#BEE7E8",
        "sidebar-shadow": "#858a99",
        "page-bgcolor": "#faffff",
        "page-accent": "#d3e0e2",
        "page-shadow": "#c7d4d5",
        "input-outline": "#ABEBD2",
        "input-primary": "#548687",
        "grey-color": "#848FA5"
      },
    },
  },
  plugins: [],
};
