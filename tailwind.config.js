module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        default: {
          10: "#18181b",
          20: "#27272a",
          30: "#3f3f46",
          40: "#52525b",
          50: "#71717a",
          60: "#a1a1aa",
          70: "#d4d4d8",
          80: "#e4e4e7",
        },
        primary: {
          default: "#22031F",
          10: "#002e62",
          20: "#004493",
          30: "#005bc4",
          40: "#006FEE",
          50: "#338ef7",
          60: "#66aaf9",
          70: "#99c7fb",
          80: "#cce3fd",
        },
        secondary: {
          default: "#042f2e",
          10: "#134e4a",
          20: "#115e59",
          30: "#0f766e",
          40: "#0d9488",
          50: "#14b8a6",
          60: "#2dd4bf",
          70: "#5eead4",
          80: "#99f6e4",
          90: "#ccfbf1",
          100: "#f0fdfa",
        },
        white: "#fff",
        black: "#000",
      },
      fontFamily: {
        openSans: ["Open Sans, sans-serif"],
      },
    },
  },
  plugins: [],
};
