/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
  "./index.html",
  "./src/**/*.{js,jsx}", // Adjust if you have different file extensions
 ],
 theme: {
  extend: {
   colors: {
    whitesmoke: "#f9f9f9",
    dimgray: {
     "100": "#707070",
     "200": "#696974",
    },
    darkslategray: "rgba(51, 51, 51, 0.7)",
    "c-07": "#333",
    black: "#000",
    "primary-black-light": "#343434",
    "primary-white-light": "#efefef",
    white: "#fff",
    "light-background": "rgba(239, 239, 239, 0.5)",
    gainsboro: "#d9d9d9",
   },
   spacing: {},
   fontFamily: {
    poppins: "Poppins",
    roboto: "Roboto",
   },
  },
  fontSize: {
   sm: "0.875rem",
   inherit: "inherit",
  },
 },
 corePlugins: {
  preflight: false,
 },
};