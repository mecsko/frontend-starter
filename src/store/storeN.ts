import $axios from "./axios.instance";
import { defineStore } from "pinia";
import { Dialog } from "quasar";
import router from "src/router";

interface IFields {
  id: number;
  categoryId: number;
  title: string;
  description: string;
  dateOfAd: string;
  undamaged: boolean;
  price: number;
  picture: string;
  category: {
    id: number;
    name: string;
  };
}

interface IState {
  dataN: Array<IFields>;
}

export const useStoreN = defineStore({
  id: "storeN",
  state: (): IState => ({
    dataN: [],
  }),
  getters: {},
  actions: {
    async getAll(): Promise<void> {
      $axios
        .get("api/advertisements2")
        .then((res) => {
          if (res && res.data) {
            this.dataN = res.data;
          }
        })
        .catch((error) => {
          Dialog.create({ title: "Error", message: error.message });
        });
    },
    async editPostById(params: any): Promise<void> {
      $axios
        .put(`api/advertisements/${params.id}`, {
          categoryId: params.category.value,
          title: params.title,
          description: params.description,
          dateOfAd: params.dateOfAd,
          undamaged: params.undamaged,
          price: params.price,
          picture: params.picture,
        })
        .then((res) => {
          if (res && res.data) {
            this.getAll();
          }
        })
        .catch((error) => {
          Dialog.create({ title: "Error", message: error.message });
        });
    },
    async deleteById(params: any): Promise<void> {
      $axios
        .delete(`api/advertisements/${params.id}`)
        .then(() => {
          this.getAll();
        })
        .catch((error) => {
          Dialog.create({ title: "Error", message: error.message });
        });
    },
    async create(params: any): Promise<void> {
      $axios
        .post("api/advertisements", {
          categoryId: params.category.value,
          title: params.title,
          description: params.description,
          dateOfAd: params.dateOfAd,
          undamaged: params.undamaged,
          price: params.price,
          picture: params.picture,
        })
        .then((res) => {
          if (res && res.data) {
            Dialog.create({ title: "Message", message: "Document saved!" });
            router.push({ name: "grid" });
          }
        })
        .catch((error) => {
          Dialog.create({ title: "Error", message: error.message });
        });
    },
  },
});
