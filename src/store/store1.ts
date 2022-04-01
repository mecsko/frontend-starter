import $axios from "./axios.instance";
import { defineStore } from "pinia";
// import { Dialog } from "quasar";
import { Loading } from "quasar";

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
    async getAll(): Promise<void> {
      this.loading = true;
      Loading.show();
      this.data1 = [];
      $axios
        .get("api/categories")
        .then((res) => {
          this.loading = false;
          Loading.hide();
          if (res && res.data) {
            this.errormsg = "";
            this.data1 = res.data;
          }
        })
        .catch((error) => {
          this.loading = false;
          Loading.hide();
          // Dialog.create({ title: "Error", message: error.message });
          this.errormsg = error.message;
        });
    },
  },
});
