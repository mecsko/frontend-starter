import $axios from "./axios.instance";
import { defineStore } from "pinia";
import { Notify, Loading } from "quasar";

Notify.setDefaults({
  position: "bottom",
  textColor: "yellow",
  timeout: 3000,
  actions: [{ icon: "close", color: "white" }],
});

interface IFields {
  id?: number;
  categoryNameField?: string;
}

interface IState {
  data1: Array<IFields>; // store documents (records) after get method
}

export const useStore1 = defineStore({
  id: "store1",
  state: (): IState => ({
    data1: [],
  }),
  getters: {},
  actions: {
    async getAll(): Promise<void> {
      Loading.show();
      this.data1 = [];
      $axios
        .get("api/categories")
        .then((res) => {
          Loading.hide();
          if (res && res.data) {
            this.data1 = res.data;
          }
        })
        .catch((error) => {
          Loading.hide();
          let msg: any = error.message;
          if (error.response.data.message) {
            msg = error.response.data.message;
          }
          Notify.create({ message: `Error on 1-side: ${msg}`, color: "negative" });
        });
    },
  },
});
