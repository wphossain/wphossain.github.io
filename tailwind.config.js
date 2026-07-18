/** @type {import('tailwindcss').Config} */

export default {

  content: [

    "./index.html",

    "./src/**/*.{js,jsx}"

  ],

  theme: {

    extend: {

      colors: {

        primary: "#0F172A",

        secondary: "#1E293B",

        accent: "#FBBF24",

        sky: "#38BDF8",

        card: "#172033",

        border: "#2A364B"

      },

      fontFamily: {

        sans: ["Inter", "sans-serif"],

        heading: ["Plus Jakarta Sans", "sans-serif"]

      },

      boxShadow: {

        glass: "0 15px 50px rgba(0,0,0,.25)",

        glow: "0 0 50px rgba(56,189,248,.25)"

      }

    }

  },

  plugins: []

};