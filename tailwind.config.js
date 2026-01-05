/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#38BDF8",
          "primary-content": "#F0F9FF",
          "secondary": "#64748B",
          "secondary-content": "#F1F5F9",
          "accent": "#A78BFA",
          "accent-content": "#1E1B4B",
          "neutral": "#1F2937",
          "neutral-content": "#F3F4F6",
          "base-100": "#FFFFFF",
          "base-200": "#FAFAFA",
          "base-300": "#F5F5F5",
          "base-content": "#1F2937",
          "info": "#38BDF8",
          "info-content": "#0C4A6E",
          "success": "#22C55E",
          "success-content": "#052E16",
          "warning": "#FBBF24",
          "warning-content": "#451A03",
          "error": "#EF4444",
          "error-content": "#450A0A",
        },
      },
      "black",
    ],
    darkTheme: "black",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
};
