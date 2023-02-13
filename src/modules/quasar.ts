import { Quasar, QuasarPluginOptions, Notify, Dialog, Loading } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/mdi-v6/mdi-v6.css";
import "quasar/src/css/index.sass";
import type { App } from "vue";

const config: Partial<QuasarPluginOptions> = {
	plugins: { Notify, Dialog, Loading },
};

export const install = (app: App) => {
	app.use(Quasar, config);
};
