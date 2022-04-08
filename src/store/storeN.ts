import $axios from "./axios.instance";
import { defineStore } from "pinia";
import { Notify, Loading } from "quasar";

Notify.setDefaults({
  position: "bottom",
  textColor: "white",
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
  dataN: Array<IFields>; // store documents (records) after get method(s)
  data: IFields; // temporary object for new, edit and delete method
  dataOld: IFields; // temporary object, before edit store data here
}

export const useStoreN = defineStore({
  id: "storeN",
  state: (): IState => ({
    dataN: [],
    data: {},
    dataOld: {},
  }),
  getters: {},
  actions: {
    async getAll(): Promise<void> {
      Loading.show();
      this.dataN = [];
      $axios
        .get("api/advertisements2")
        .then((res) => {
          Loading.hide();
          if (res && res.data) {
            this.dataN = res.data;
          }
        })
        .catch((error) => {
          Loading.hide();
          Notify.create({ message: `Error on N-side: ${error.message}`, color: "negative" });
        });
    },
    async getById(): Promise<void> {
      if (this.data && this.data.id) {
        Loading.show();
        $axios
          .get(`api/advertisements/${this.data.id}`)
          .then((res) => {
            Loading.hide();
            if (res && res.data) {
              this.data = res.data;
              Object.assign(this.dataOld, this.data);
              // this.dataOld = JSON.parse(JSON.stringify(this.data));
            }
          })
          .catch((error) => {
            Loading.hide();
            Notify.create({ message: `Error on N-side: ${error.message}`, color: "negative" });
          });
      }
    },
    async editById(): Promise<void> {
      if (this.data && this.data.id) {
        const diff: any = {};
        Object.keys(this.data).forEach((k, i) => {
          const newValue = Object.values(this.data)[i];
          const oldValue = Object.values(this.dataOld)[i];
          if (newValue != oldValue) diff[k] = newValue;
        });
        if (Object.keys(diff).length == 0) {
          Notify.create({
            message: "Nothing changed!",
            color: "negative",
          });
          process.exit(0);
        }
        Loading.show();
        $axios
          .patch(`api/advertisements/${this.data.id}`, diff)
          .then((res) => {
            Loading.hide();
            if (res && res.data) {
              this.data = {};
              this.getAll();
              Notify.create({
                message: `Document with id=${res.data.id} has been edited successfully!`,
                color: "positive",
              });
            }
          })
          .catch((error) => {
            Loading.hide();
            Notify.create({ message: `Error on N-side: ${error.message}`, color: "negative" });
          });
      }
    },
    async deleteById(): Promise<void> {
      if (this.data && this.data.id) {
        Loading.show();
        const id = this.data.id;
        $axios
          .delete(`api/advertisements/${this.data.id}`)
          .then(() => {
            Loading.hide();
            this.getAll();
            this.data = {};
            Notify.create({
              message: `Document with id=${id} has been deleted successfully!`,
              color: "positive",
            });
          })
          .catch((error) => {
            Loading.hide();
            Notify.create({ message: `Error on N-side: ${error.message}`, color: "negative" });
          });
      }
    },
    async create(): Promise<void> {
      if (this.data) {
        Loading.show();
        delete this.data.category;
        $axios
          .post("api/advertisements", this.data)
          .then((res) => {
            Loading.hide();
            if (res && res.data) {
              // this.data = {};
              this.getAll();
              Notify.create({
                message: `New document with id=${res.data.id} has been saved successfully!`,
                color: "positive",
              });
            }
          })
          .catch((error) => {
            Loading.hide();
            Notify.create({ message: `Error on N-side: ${error.message}`, color: "negative" });
          });
      }
    },
  },
});
