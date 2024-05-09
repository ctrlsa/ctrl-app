import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import("@sveltejs/kit").Config} */
const config = {
  kit: {
    adapter: adapter(),
    files: {
      lib: "src/shared",
      routes: "src/pages"
    },
    paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
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
