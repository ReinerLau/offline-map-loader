import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "./index.ts",
  output: {
    file: "bundle.js",
    format: "cjs",
  },
  plugins: [typescript(), resolve(), commonjs(), json()],
};
