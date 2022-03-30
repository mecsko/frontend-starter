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
  };
}

interface IState {
  errormsg: string | null;
  dataN: Array<IFields>;
  data: IFields | null; // for edit record
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
    async getById(params: any): Promise<void> {
      $axios
        .get(`api/advertisements/${params}`)
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
    },
    async editPostById(params: any): Promise<void> {
      if (this.data) {
        $axios
          .put(`api/advertisements/${params}`, this.data)
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
    async deleteById(params: any): Promise<void> {
      $axios
        .delete(`api/advertisements/${params.id}`)
        .then(() => {
          this.errormsg = null;
          this.getAll();
        })
        .catch((error) => {
          this.errormsg = error.message;
          // Dialog.create({ title: "Error", message: error.message });
        });
    },
    async create(params: any): Promise<void> {
      $axios
        .post("api/advertisements", {
          categoryId: params.category.value,
          titleField: params.titleField,
          descField: params.descField,
          dateField: params.dateField,
          boolField: params.boolField,
          priceField: params.priceField,
          imgField: params.imgField,
        })
        .then((res) => {
          if (res && res.data) {
            this.errormsg = null;
            router.push({ name: "xgrid" });
          }
        })
        .catch((error) => {
          this.errormsg = error.message;
          // Dialog.create({ title: "Error", message: error.message });
        });
    },
  },
});
