export default {
  plugins: {
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {
      flexbox: true,
      grid: true
    },
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  }
} 