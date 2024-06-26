import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import("@sveltejs/kit").Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "index.html",
      precompress: false,
      strict: true
    }),
    files: {
      lib: "src/shared",
      routes: "src/pages"
    },
    alias: {
      $processes: "src/processes",
      $pages: "src/pages",
      $widgets: "src/widgets",
      $features: "src/features",
      $entities: "src/entities",
      $shared: "src/shared"
    }
  },
  preprocess: vitePreprocess()
};

export default config;
