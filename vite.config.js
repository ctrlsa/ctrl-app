import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import mkcert from 'vite-plugin-mkcert'

/** @type {import('@sveltejs/kit').Config} */
export default defineConfig({
  plugins: [sveltekit(), nodePolyfills({include: ['buffer']}), mkcert()],
  server: {
    https: true,
    host: '0.0.0.0',
  },
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"]
  }
});
