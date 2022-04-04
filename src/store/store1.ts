import $axios from "./axios.instance";
import { defineStore } from "pinia";
import { Notify, Loading } from "quasar";
// import { Dialog, Loading } from "quasar";

Notify.setDefaults({
  position: "bottom",
  textColor: "yellow",
  timeout: 3000,
  actions: [{ icon: "close", color: "white" }],
});

interface IFields {
  id?: number;
  nameField?: string;
}

interface IState {
  loading: boolean; // true if waiting for backend response
  msg: string; // last message on "1"-side
  data1: Array<IFields>; // store documents (records) after get method
}

export const useStore1 = defineStore({
  id: "store1",
  state: (): IState => ({
    loading: false,
    msg: "",
    data1: [],
  }),
  getters: {},
  actions: {
    loadingShow(): void {
      this.loading = true;
      Loading.show();
    },
    loadingHide(): void {
      this.loading = false;
      Loading.hide();
    },
    showErrorMessage(msg: string): void {
      this.msg = msg;
      Notify.create({ message: `Error on 1-side: ${msg}`, color: "negative" });
    },
    async getAll(): Promise<void> {
      this.loadingShow();
      this.data1 = [];
      $axios
        .get("api/categories")
        .then((res) => {
          this.loadingHide();
          if (res && res.data) {
            this.data1 = res.data;
          }
        })
        .catch((error) => {
          this.loading = false;
          Loading.hide();
          this.showErrorMessage(error.message);
        });
    },
  },
});
