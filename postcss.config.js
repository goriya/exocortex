// "If you’re using postcss-import (or a tool that uses it under the hood, such as Webpacker for Rails),
//use our imports instead of the @tailwind directive to avoid issues when importing any of your own additional files:"

// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
