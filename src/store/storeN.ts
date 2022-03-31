import $axios from "./axios.instance";
import { defineStore } from "pinia";
// import { Dialog } from "quasar";
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
  } | null;
}

interface IState {
  errormsg: string | null;
  dataN: Array<IFields>;
  data: IFields | null; // for edit and new record
}

export const useStoreN = defineStore({
  id: "storeN",
  state: (): IState => ({
    errormsg: null,
    dataN: [],
    data: null,
  }),
  getters: {},
  actions: {
    async getAll(): Promise<void> {
      $axios
        .get("api/advertisements2")
        .then((res) => {
          if (res && res.data) {
            this.errormsg = null;
            this.dataN = res.data;
          }
        })
        .catch((error) => {
          // Dialog.create({ title: "Error", message: error.message });
          this.errormsg = error.message;
        });
    },
    async getById(): Promise<void> {
      if (this.data && this.data.id) {
        $axios
          .get(`api/advertisements/${this.data.id}`)
          .then((res) => {
            if (res && res.data) {
              this.errormsg = null;
              this.data = res.data;
            }
          })
          .catch((error) => {
            // Dialog.create({ title: "Error", message: error.message });
            this.errormsg = error.message;
            this.data = null;
          });
      }
    },
    async editPostById(): Promise<void> {
      if (this.data && this.data.id) {
        $axios
          .put(`api/advertisements/${this.data.id}`, this.data)
          .then((res) => {
            if (res && res.data) {
              this.errormsg = null;
              this.data = null;
              this.getAll();
            }
          })
          .catch((error) => {
            this.errormsg = error.message;
            this.data = null;
            // Dialog.create({ title: "Error", message: error.message });
          });
      }
    },
    async deleteById(): Promise<void> {
      if (this.data && this.data.id) {
        $axios
          .delete(`api/advertisements/${this.data.id}`)
          .then(() => {
            this.errormsg = null;
            this.getAll();
          })
          .catch((error) => {
            this.errormsg = error.message;
            // Dialog.create({ title: "Error", message: error.message });
          });
      }
    },
    async create(): Promise<void> {
      if (this.data) {
        this.data.categoryId = 1; // ez itt nem jó!
        delete this.data.category;

        $axios
          .post("api/advertisements", this.data)
          .then((res) => {
            if (res && res.data) {
              this.errormsg = null;
              router.push({ name: "xcard" });
            }
          })
          .catch((error) => {
            this.errormsg = error.message;
            // Dialog.create({ title: "Error", message: error.message });
          });
      }
    },
  },
});
