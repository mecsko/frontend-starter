import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
	const showMenuBar = ref(true);
	const showLeftDrawer = ref(true);
	const showRightDrawer = ref(true);
	const showTaskBar = ref(true);
	const showEditDialog = ref(false);
	const showNewDialog = ref(false);
	const filter = ref("");

	return { showMenuBar, showLeftDrawer, showRightDrawer, showTaskBar, showEditDialog, showNewDialog, filter };
});
