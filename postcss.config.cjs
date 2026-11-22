// Solo lo usa Vite (app React). Las páginas antiguas usan el CLI de Tailwind (build:legacy).
module.exports = {
  plugins: {
    tailwindcss: { config: './tailwind.app.config.cjs' },
    autoprefixer: {},
  },
}
