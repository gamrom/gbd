import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  // important: "#root",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            //보석 테마
            // default: "#E6EEF6",
            // primary: "#567ABD",
            // secondary: "#833A8E",
            // success: "#009B6B",
            // warning: "#F9C15F",
            // danger: "#DE0053",
            // 열기구(?)
            // default: "#C2E5F9",
            // primary: "#008DB7",
            // secondary: "#261F87",
            // success: "#008554",
            // warning: "#FFDC00",
            // danger: "#EA5404",
            //후지산의일출
            default: "#f8e9d1",
            primary: "#7D93BA",
            secondary: "#404a72",
            success: "#3362a8",
            warning: "#f18d1d",
            danger: "#eb6137",
          },
        },
      },
      // themes: {
      //   light: {
      //     layout: {}, // light theme layout tokens
      //     colors: {
      //       primary: "#FF0000",
      //     }, // light theme colors
      //   },
      //   dark: {
      //     layout: {}, // dark theme layout tokens
      //     colors: {}, // dark theme colors
      //   },
      // },
    }),
  ],
  // corePlugins: {
  //   preflight: false,
  // },
});
export default config;
