/* eslint-disable no-unused-vars */
import { createApp, App as VueApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// install all modules from `modules/*.ts`
const modules = import.meta.glob<{ install: (app: VueApp) => void }>("/src/modules/*.ts", {
	eager: true,
});
Object.values(modules).forEach((module) => module.install(app));

app.mount("#app");
