module.exports = {
  content: ["./src/**/*.{html,js,jsx}",  "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  "./node_modules/react-tailwindcss-select/dist/index.esm.js",  "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
}