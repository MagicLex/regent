/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1eb182',
        border: '#e5e7eb',
        'surface-light': '#f9fafb',
        'surface-dark': '#f3f4f6',
      },
      borderRadius: {
        DEFAULT: '1px',
      },
    },
  },
  plugins: [],
}