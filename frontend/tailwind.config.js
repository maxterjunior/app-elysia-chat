const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPrimary: "#bc2524",
        customSecondary: "#332F2E",
        customTertiary: "#413B44",
		customQuaternary: "#F86922",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
