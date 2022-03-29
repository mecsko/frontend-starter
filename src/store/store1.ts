import $axios from "./axios.instance";
import { defineStore } from "pinia";
// import { Dialog } from "quasar";

interface IFields {
  id: number;
  nameField: string;
}

interface IState {
  errormsg: string | null;
  data1: Array<IFields>;
}

export const useStore1 = defineStore({
  id: "store1",
  state: (): IState => ({
    errormsg: null,
    data1: [],
  }),
  getters: {},
  actions: {
    async getAll(): Promise<void> {
      $axios
        .get("api/categories")
        .then((res) => {
          if (res && res.data) {
            this.errormsg = null;
            this.data1 = res.data;
          }
        })
        .catch((error) => {
          // Dialog.create({ title: "Error", message: error.message });
          this.errormsg = error.message;
        });
    },
  },
});
