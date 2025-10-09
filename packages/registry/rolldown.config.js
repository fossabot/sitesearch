import path from "node:path";
import { defineConfig } from "rolldown";
import { dts } from "rolldown-plugin-dts";
import postcss from "rollup-plugin-postcss";

export default defineConfig([
  // ES Module build with CSS extraction
  {
    input: "registry/index.ts",
    output: {
      dir: ".",
    },
    plugins: [
      postcss({
        extract: path.resolve("dist/sitesearch.css"),
        minimize: false,
        sourceMap: true,
      }),
      dts({
        tsconfig: "tsconfig.json",
        fileName: "index.d.ts",
        sourcemap: true,
      }),
    ],
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    external: [
      "react",
      "react-dom",
      "algoliasearch",
      "algoliasearch/lite",
      "react-instantsearch",
      "@ai-sdk/react",
      "ai",
      "marked",
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
  },
  // Minified CSS build
  {
    input: "registry/index.ts",
    output: {
      file: "dist/index.min.js",
      format: "esm",
      sourcemap: true,
      minify: true,
      assetFileNames: "[name][extname]",
    },
    plugins: [
      postcss({
        extract: path.resolve("dist/sitesearch.min.css"),
        minimize: true,
        sourceMap: true,
      }),
    ],
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    external: [
      "react",
      "react-dom",
      "algoliasearch",
      "algoliasearch/lite",
      "react-instantsearch",
      "@ai-sdk/react",
      "ai",
      "marked",
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    treeshake: true,
  },
]);
