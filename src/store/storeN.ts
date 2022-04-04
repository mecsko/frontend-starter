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
  msg: string; // last message on "N" side
  loading: boolean; // true if waiting for backend response
  dataN: Array<IFields>; // store documents (records) after get method(s)
  data: IFields; // temporary object for new, edit and delete method
  dataOld: IFields; // temporary object, before edit store data here
}

export const useStoreN = defineStore({
  id: "storeN",
  state: (): IState => ({
    msg: "",
    loading: false,
    dataN: [],
    data: {},
    dataOld: {},
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
    showErrorMessage(message: string): void {
      this.msg = message;
      Notify.create({ message: `Error on N-side: ${message}`, color: "negative" });
    },
    async getAll(): Promise<void> {
      this.loadingShow();
      this.dataN = [];
      $axios
        .get("api/advertisements2")
        .then((res) => {
          this.loadingHide();
          if (res && res.data) {
            this.dataN = res.data;
          }
        })
        .catch((error) => {
          this.loadingHide();
          this.showErrorMessage(error.message);
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
              this.data = res.data;
              Object.assign(this.dataOld, this.data);
              // this.dataOld = JSON.parse(JSON.stringify(this.data));
            }
          })
          .catch((error) => {
            this.loadingHide();
            this.showErrorMessage(error.message);
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
        this.loadingShow();
        $axios
          .patch(`api/advertisements/${this.data.id}`, diff)
          .then((res) => {
            this.loadingHide();
            if (res && res.data) {
              this.data = {};
              this.getAll();
              Notify.create({
                message: `Document with id=${res.data.id} has been edited successfully!`,
                color: "positive",
              });
              this.msg = `Document with id=${res.data.id} has been edited successfully!`;
            }
          })
          .catch((error) => {
            this.loadingHide();
            this.showErrorMessage(error.message);
          });
      }
    },
    async deleteById(): Promise<void> {
      if (this.data && this.data.id) {
        this.loadingShow();
        const id = this.data.id;
        $axios
          .delete(`api/advertisements/${this.data.id}`)
          .then(() => {
            this.loadingHide();
            this.getAll();
            this.data = {};
            Notify.create({
              message: `Document with id=${id} has been deleted successfully!`,
              color: "positive",
            });
            this.msg = `Document with id=${id} has been deleted successfully!`;
          })
          .catch((error) => {
            this.loadingHide();
            this.showErrorMessage(error.message);
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
              // this.data = {};
              this.getAll();
              Notify.create({
                message: `New document with id=${res.data.id} has been saved successfully!`,
                color: "positive",
              });
              this.msg = `New document with id=${res.data.id} has been saved successfully!`;
            }
          })
          .catch((error) => {
            this.loadingHide();
            this.showErrorMessage(error.message);
          });
      }
    },
  },
});
