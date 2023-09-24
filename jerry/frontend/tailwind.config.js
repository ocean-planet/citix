/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "node_modules/daisyui/dist/**/*.{css,js}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        border: "background ease infinite",
      },
      keyframes: {
        background: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
}
