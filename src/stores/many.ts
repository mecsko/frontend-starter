import { ref } from "vue";
import { Loading, Notify } from "quasar";
import { defineStore } from "pinia";
import { useAppStore } from "@stores/app";
import $axios from "@api/axios.instance";
import { ShowErrorWithNotify } from "@utils/notification";
import type { IMany } from "@interfaces/many";

export const useManyStore = defineStore("many", () => {
	const document = ref<Partial<IMany>>();
	const documentOld = ref<IMany>();
	const documents = ref<IMany[]>();

	async function many_GetAll(): Promise<void> {
		try {
			Loading.show();
			documents.value = [];
			const { data } = await $axios.get<IMany[]>("api/advertisements");
			Loading.hide();
			if (data) {
				documents.value = data;
			}
		} catch (error) {
			ShowErrorWithNotify(error);
		}
	}

	async function many_GetById(): Promise<void> {
		try {
			if (document.value?.id) {
				Loading.show();
				const { data } = await $axios.get<IMany>(`api/advertisements/${document.value.id}`);
				Loading.hide();
				if (data) {
					document.value = data;
					documentOld.value = { ...data };
				}
			}
		} catch (error) {
			ShowErrorWithNotify(error);
		}
	}

	async function many_Filter(): Promise<void> {
		try {
			// Loading.show();
			const appStore = useAppStore();
			if (appStore.filter) {
				documents.value = [];
				const { data } = await $axios.get<IMany[]>(`advertisements?_expand=category&q=${appStore.filter}`);

				if (data) {
					documents.value = data;
				}
			}
		} catch (error) {
			ShowErrorWithNotify(error);
		}
	}

	async function many_EditById(): Promise<void | boolean> {
		try {
			if (document.value?.id) {
				const diff: Partial<IMany> = {};
				// the diff object only stores changed fields:
				Object.keys(document.value).forEach((k, i) => {
					const newValue = Object.values(document.value as IMany)[i];
					const oldValue = Object.values(documentOld.value as IMany)[i];
					if (newValue != oldValue) {
						diff[k as keyof IMany] = newValue;
					}
				});
				if (Object.keys(diff).length == 0) {
					Notify.create({
						message: "Nothing changed!",
						color: "negative",
					});
					return false;
				} else {
					Loading.show();
					const { data } = await $axios.patch<Partial<IMany>>(`api/advertisements/${document.value.id}`, diff);

					Loading.hide();
					if (data.id) {
						many_GetAll(); // refresh dataN with read all data again from backend
						Notify.create({
							message: `Document with id=${data.id} has been edited successfully!`,
							color: "positive",
						});
					}
				}
			}
		} catch (error) {
			ShowErrorWithNotify(error);
		}
	}

	async function many_DeleteById(): Promise<void> {
		try {
			if (document.value?.id) {
				Loading.show();
				await $axios.delete(`api/advertisements/${document.value.id}`);
				Loading.hide();
				many_GetAll(); // refresh dataN with read all data again from backend
				Notify.create({
					message: `Document with id=${document.value?.id} has been deleted successfully!`,
					color: "positive",
				});
			}
		} catch (error) {
			ShowErrorWithNotify(error);
		}
	}

	async function many_Create(): Promise<void> {
		try {
			if (document.value) {
				Loading.show();
				const { data } = await $axios.post("api/advertisements", document.value);
				Loading.hide();
				if (data) {
					Loading.hide();
					many_GetAll(); // refresh dataN with read all data again from backend
					Notify.create({
						message: `New document with id=${data.id} has been saved successfully!`,
						color: "positive",
					});
					// router.push("/page_path");
				}
			}
		} catch (error) {
			ShowErrorWithNotify(error);
		}
	}

	return {
		document,
		documentOld,
		documents,
		many_GetAll,
		many_GetById,
		many_Filter,
		many_Create,
		many_EditById,
		many_DeleteById,
	};
});
