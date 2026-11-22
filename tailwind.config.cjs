/** Tailwind de las páginas HTML antiguas (public/). Genera public/styles.css. */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)'
      }
    }
  },
  plugins: [],
}
