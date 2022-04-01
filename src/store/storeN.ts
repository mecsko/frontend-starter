import $axios from "./axios.instance";
import { defineStore } from "pinia";
import { Dialog } from "quasar";
import { Loading } from "quasar";
// import router from "src/router";

interface IFields {
  id?: number; // PK
  categoryId?: number; // FK
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
    loadingShow(): void {
      this.loading = true;
      Loading.show();
    },
    loadingHide(): void {
      this.loading = false;
      Loading.hide();
    },
    showErrorDialog(msg: string): void {
      this.errormsg = msg;
      Dialog.create({ title: "Error on N-side", message: msg });
    },
    async getAll(): Promise<void> {
      this.loadingShow();
      this.dataN = [];
      $axios
        .get("api/advertisements2")
        .then((res) => {
          this.loadingHide();
          if (res && res.data) {
            this.errormsg = "";
            this.dataN = res.data;
          }
        })
        .catch((error) => {
          this.loadingHide();
          this.showErrorDialog(error.message);
        });
    },
    async getById(): Promise<void> {
      if (this.data && this.data.id) {
        this.loadingShow();
        $axios
          .get(`api/advertisements/${this.data.id}`)
          .then((res) => {
            this.loadingHide();
            if (res && res.data) {
              this.errormsg = "";
              this.data = res.data;
            }
          })
          .catch((error) => {
            this.loadingHide();
            this.showErrorDialog(error.message);
          });
      }
    },
    async editById(): Promise<void> {
      if (this.data && this.data.id) {
        this.loadingShow();
        $axios
          .put(`api/advertisements/${this.data.id}`, this.data)
          .then((res) => {
            this.loadingHide();
            if (res && res.data) {
              this.errormsg = "";
              this.data = {};
              Dialog.create({ title: "Edit document", message: "Success!" });
            }
          })
          .catch((error) => {
            this.loadingHide();
            this.showErrorDialog(error.message);
          });
      }
    },
    async deleteById(): Promise<void> {
      if (this.data && this.data.id) {
        this.loadingShow();
        $axios
          .delete(`api/advertisements/${this.data.id}`)
          .then(() => {
            this.loadingHide();
            this.errormsg = "";
            this.data = {};
            this.getAll();
            Dialog.create({ title: "Delete document", message: "Success!" });
          })
          .catch((error) => {
            this.loadingHide();
            this.showErrorDialog(error.message);
          });
      }
    },
    async create(): Promise<void> {
      if (this.data) {
        this.loadingShow();
        delete this.data.category;
        $axios
          .post("api/advertisements", this.data)
          .then((res) => {
            this.loadingHide();
            if (res && res.data) {
              this.errormsg = "";
              this.data = {};
              Dialog.create({ title: "Create document", message: "Success!" });
            }
          })
          .catch((error) => {
            this.loadingHide();
            this.showErrorDialog(error.message);
          });
      }
    },
  },
});
