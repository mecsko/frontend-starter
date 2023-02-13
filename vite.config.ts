import { resolve } from "path";
import { defineConfig } from "vite";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
	plugins: [vue({ template: { transformAssetUrls } }), quasar({ sassVariables: "src/assets/quasar-variables.sass" })],
	resolve: {
		alias: {
			"@api": resolve(__dirname, "src/api"),
			"@components": resolve(__dirname, "src/components"),
			"@interfaces": resolve(__dirname, "src/interfaces"),
			"@modules": resolve(__dirname, "src/modules"),
			"@pages": resolve(__dirname, "src/pages"),
			"@stores": resolve(__dirname, "src/stores"),
			"@utils": resolve(__dirname, "src/utils"),
		},
	},
	build: {
		// reportCompressedSize: true,
		chunkSizeWarningLimit: 1024,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("/node_modules/")) {
						// Set the NPM package
						const modules = ["quasar", "@quasar", "vue", "@vue", "axios", "pinia"];
						const chunk = modules.find((module) => id.includes(`/node_modules/${module}`));
						return chunk ? `vendor-${chunk}` : "vendor";
					}
				},
			},
		},
	},
});
