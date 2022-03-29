module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js", 
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend:{
      colors:{
      'grey':"#79879a",
      'dark':"#333333",
      'gold':"#b3971a",
      'light':"#e6e6e6",
      'white':"#ffffff",
      'grey2':"#707070",
      'blue2':"#1a7f92",
      'blue':"#1a7f92"
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'class',
    }),
    require("tw-elements/dist/plugin"),
    require("flowbite/plugin")
  ],
}