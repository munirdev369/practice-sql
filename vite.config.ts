import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3002,
	},
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: "globalThis",
			},
			plugins: [
				// NodeModulesPolyfillPlugin(),
				// NodeGlobalsPolyfillPlugin({ buffer: true, process: true }),
			],
		},
	},
});
