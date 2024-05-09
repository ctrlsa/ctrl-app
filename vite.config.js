import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import { nodePolyfills } from 'vite-plugin-node-polyfills';

/** @type {import('@sveltejs/kit').Config} */
export default defineConfig({
  plugins: [sveltekit(), nodePolyfills({include: ['buffer']})],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"]
  }
});
