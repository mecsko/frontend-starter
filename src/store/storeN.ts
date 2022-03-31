import $axios from "./axios.instance";
import { defineStore } from "pinia";
// import { Dialog } from "quasar";
import { Loading } from "quasar";
import router from "src/router";

interface IFields {
  id?: number; // PK
  categoryId?: number; // FK
  categoryName?: string;
  titleField?: string;
  descField?: string;
  dateField?: string;
  boolField?: boolean;
  priceField?: number;
  imgField?: string;
  // JSON-server "expand" data as object from "1"-side:
  category?: {
    id?: number;
    nameField?: string;
  };
}

interface IState {
  errormsg: string;
  loading: boolean;
  dataN: Array<IFields>;
  data: IFields; // for edit and new record
}

export const useStoreN = defineStore({
  id: "storeN",
  state: (): IState => ({
    errormsg: "",
    loading: false,
    dataN: [],
    data: {},
  }),
  getters: {},
  actions: {
    async getAll(): Promise<void> {
      this.loading = true;
      Loading.show();
      this.dataN = [];
      $axios
        .get("api/advertisements2")
        .then((res) => {
          this.loading = false;
          Loading.hide();
          if (res && res.data) {
            this.errormsg = "";
            this.dataN = res.data;
          }
        })
        .catch((error) => {
          this.loading = false;
          Loading.hide();
          // Dialog.create({ title: "Error", message: error.message });
          this.errormsg = error.message;
        });
    },
    async getById(): Promise<void> {
      if (this.data && this.data.id) {
        this.loading = true;
        Loading.show();
        $axios
          .get(`api/advertisements/${this.data.id}`)
          .then((res) => {
            this.loading = false;
            Loading.hide();
            if (res && res.data) {
              this.errormsg = "";
              this.data = res.data;
            }
          })
          .catch((error) => {
            this.loading = false;
            Loading.hide();
            // Dialog.create({ title: "Error", message: error.message });
            this.errormsg = error.message;
          });
      }
    },
    async editPostById(): Promise<void> {
      if (this.data && this.data.id) {
        this.loading = true;
        Loading.show();
        $axios
          .put(`api/advertisements/${this.data.id}`, this.data)
          .then((res) => {
            this.loading = false;
            if (res && res.data) {
              this.errormsg = "";
              router.push({ name: "xcard" });
            }
            this.data = {};
          })
          .catch((error) => {
            this.loading = false;
            Loading.hide();
            this.errormsg = error.message;
            this.data = {};
            // Dialog.create({ title: "Error", message: error.message });
          });
      }
    },
    async deleteById(): Promise<void> {
      if (this.data && this.data.id) {
        this.loading = true;
        Loading.show();
        $axios
          .delete(`api/advertisements/${this.data.id}`)
          .then(() => {
            this.loading = false;
            Loading.hide();
            this.errormsg = "";
            this.data = {};
          })
          .catch((error) => {
            this.loading = false;
            Loading.hide();
            this.errormsg = error.message;
            this.data = {};
            // Dialog.create({ title: "Error", message: error.message });
          });
      }
    },
    async create(): Promise<void> {
      if (this.data) {
        this.loading = true;
        Loading.show();
        delete this.data.category;
        $axios
          .post("api/advertisements", this.data)
          .then((res) => {
            this.loading = false;
            Loading.hide();
            if (res && res.data) {
              this.errormsg = "";
              this.data = {};
              router.push({ name: "xcard" });
            }
          })
          .catch((error) => {
            this.loading = false;
            Loading.hide();
            this.data = {};
            this.errormsg = error.message;
            // Dialog.create({ title: "Error", message: error.message });
          });
      }
    },
  },
});
