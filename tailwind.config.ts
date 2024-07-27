import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        blurBackgroud: "rgba(0, 0, 0, 0.8)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "top-green": "0 -15px 6px rgba(0, 128, 0, .5)",
        "round-blue-shadow1": "0px 0px 30px 10px rgba(0, 0, 60, 1)",
        "round-blue-shadow2": "0px 0px 50px 40px rgba(0, 0, 140, 1)",
        "round-blue-shadow3": "0px 0px 80px 45px rgba(0, 0, 180, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-filters")],
};
export default config;
