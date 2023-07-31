const terser = require("@rollup/plugin-terser");
const typescript = require("@rollup/plugin-typescript");
const vueJsx = require("@vitejs/plugin-vue-jsx");
const { defineConfig } = require("rollup");

module.exports = defineConfig({
  input: "index.ts",
  output: {
    dir: "lib",
    format: "es",
  },
  plugins: [terser(), typescript(), vueJsx()],
});
