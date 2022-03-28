import $axios from "./axios.instance";
import { defineStore } from "pinia";
import { Dialog } from "quasar";

interface IFields {
  id: number;
  name: string;
}

interface IState {
  data1: Array<IFields>;
}

export const useStore1 = defineStore({
  id: "store1",
  state: (): IState => ({
    data1: [],
  }),
  getters: {},
  actions: {
    async getAll(): Promise<void> {
      $axios
        .get("api/categories")
        .then((res) => {
          if (res && res.data) {
            this.data1 = res.data;
          }
        })
        .catch((error) => {
          Dialog.create({ title: "Error", message: error.message });
        });
    },
  },
});
