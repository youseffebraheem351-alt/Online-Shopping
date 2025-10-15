/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class', // ✅ لازم دي عشان Dark Mode يشتغل على حسب الكلاس
  theme: {
    extend: {},
  },
  plugins: [],
}
