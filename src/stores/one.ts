import $axios from "@api/axios.instance";
import { defineStore } from "pinia";
import { Loading } from "quasar";
import { ref } from "vue";
import { ShowErrorWithNotify } from "@utils/notification";
import type { IOne } from "@interfaces/one";

export const useOneStore = defineStore("one", () => {
	const document = ref<IOne>();
	const documentOld = ref<IOne>();
	const documents = ref<IOne[]>();

	async function one_GetAll(): Promise<void> {
		try {
			Loading.show();
			documents.value = [];
			const { data } = await $axios.get<IOne[]>("api/categories");

			Loading.hide();
			if (data) {
				documents.value = data;
			}
		} catch (error) {
			ShowErrorWithNotify(error);
		}
	}

	return { document, documentOld, documents, one_GetAll };
});
