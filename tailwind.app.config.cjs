/** Tailwind de la app React (app/). */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/index.html", "./app/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)'
      },
      fontFamily: { global: 'var(--font-global)' }
    }
  },
  plugins: [],
}
