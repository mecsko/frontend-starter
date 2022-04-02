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
  id?: number; // PK
  categoryId?: number; // FK
  titleField?: string;
  descField?: string;
  dateField?: string;
  boolField?: boolean;
  priceField?: number;
  imgField?: string;
  // JSON-server and MongoDb-populate() return field(s) with object type from the "1"-side:
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
    showError(msg: string): void {
      this.errormsg = msg;
      // Dialog.create({ title: "Error on N-side", message: msg });
      Notify.create({ message: `Error on N-side: ${msg}`, color: "negative" });
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
          this.showError(error.message);
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
            this.showError(error.message);
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
              // Dialog.create({ title: "Edit document", message: "Success!" });
              Notify.create({ message: "Edit document: Success!", color: "positive" });
            }
          })
          .catch((error) => {
            this.loadingHide();
            this.showError(error.message);
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
            // Dialog.create({ title: "Delete document", message: "Success!" });
            Notify.create({ message: "Delete document: Success!", color: "positive" });
          })
          .catch((error) => {
            this.loadingHide();
            this.showError(error.message);
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
              // Dialog.create({ title: "Create document", message: "Success!" });
              Notify.create({ message: "Save new document: Success!", color: "positive" });
            }
          })
          .catch((error) => {
            this.loadingHide();
            this.showError(error.message);
          });
      }
    },
  },
});
