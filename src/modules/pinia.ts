import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import type { App } from "vue";

export const install = (app: App) => {
	const pinia = createPinia();
	pinia.use(piniaPersist);
	app.use(pinia);
};
