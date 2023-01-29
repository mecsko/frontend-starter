import $axios from "./axios.instance";
import { defineStore } from "pinia";
import { Notify, Loading } from "quasar";

Notify.setDefaults({
  position: "bottom",
  textColor: "yellow",
  timeout: 3000,
  actions: [{ icon: "close", color: "white" }],
});

// you can remove the IFields interface and use the "any" type instead, but you loose the intellisens feature
interface IFields {
  id?: number;
  categoryNameField?: string;
}

interface IState {
  data1: Array<IFields>; // store documents (records) after get method
}

function ShowErrorWithNotify(error: any): void {
  Loading.hide();
  let msg = "Error on 1-side";

  // The optional chaining (?.) operator accesses an object's property or calls a function.
  // If the object accessed or function called is undefined or null,
  // it returns undefined instead of throwing an error.
  if (error?.response?.data?.status) {
    msg += ` (${error.response.data.status}):`;
  } else if (error?.response?.status) {
    msg += ` (${error.response.status}):`;
  } else {
    msg += ":";
  }

  if (error?.response?.data?.message) {
    msg += ` (${error.response.data.message}):`;
  } else if (error?.response?.message) {
    msg += ` ${error.response.message}`;
  } else if (error?.request && error?.message) {
    msg += ` No response(${error.message})`; // if no response
  } else if (error?.message) {
    msg += ` Message(${error.message})`;
  } else {
    msg += " Unknow error message";
  }

  Notify.create({ message: msg, color: "negative" });
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
          if (res?.data) {
            this.data1 = res.data;
          }
        })
        .catch((error) => {
          ShowErrorWithNotify(error);
        });
    },
  },
});
