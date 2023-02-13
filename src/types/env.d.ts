/* eslint-disable @typescript-eslint/ban-types */
/// <reference types="vite/client" />

declare module "*.vue" {
	import { DefineComponent } from "vue";
	const component: DefineComponent<{}, {}, unknown>;
	export default component;
}
