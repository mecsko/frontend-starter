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
  loading: boolean;
  errormsg: string;
  data1: Array<IFields>;
  data: IFields;
}

export const useStore1 = defineStore({
  id: "store1",
  state: (): IState => ({
    loading: false,
    errormsg: "",
    data1: [],
    data: {},
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
    showError(msg: string): void {
      this.errormsg = msg;
      // Dialog.create({ title: "Error on 1-side", message: msg });
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
            this.errormsg = "";
            this.data1 = res.data;
          }
        })
        .catch((error) => {
          this.loading = false;
          Loading.hide();
          this.showError(error.message);
        });
    },
  },
});
