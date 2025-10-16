import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import { defineConfig } from "rolldown";
import postcss from "rollup-plugin-postcss";

const common = {
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  external: [],
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime",
    },
  },
};

export default defineConfig([
  {
    input: "src/vanilla/search.tsx",
    output: {
      dir: "dist",
      entryFileNames: "search.min.js",
      format: "umd",
      name: "SiteSearch",
      sourcemap: true,
      minify: true,
    },
    plugins: [
      postcss({
        extract: "search.min.css",
        sourceMap: true,
        plugins: [autoprefixer(), cssnano()],
      }),
    ],
    treeshake: true,
    ...common,
  },
  {
    input: "src/vanilla/search-askai.tsx",
    output: {
      dir: "dist",
      entryFileNames: "search-askai.min.js",
      format: "umd",
      name: "SiteSearchAskAI",
      sourcemap: true,
      minify: true,
    },
    plugins: [
      postcss({
        extract: "search-askai.min.css",
        sourceMap: true,
        plugins: [autoprefixer(), cssnano()],
      }),
    ],
    treeshake: true,
    ...common,
  },
]);
