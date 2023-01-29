import $axios from "./axios.instance";
import { defineStore } from "pinia";
import { Notify, Loading } from "quasar";
// import router from "src/router";

Notify.setDefaults({
  position: "bottom",
  textColor: "white",
  timeout: 3000,
  actions: [{ icon: "close", color: "white" }],
});

// you can remove the IFields interface and use the "any" type instead, but you loose the intellisens feature
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
    categoryNameField?: string;
  };
}

interface IState {
  dataN: Array<IFields>; // store documents (records) after get method(s)
  data: IFields; // temporary object for create, edit and delete methods
  dataOld: IFields; // temporary object for edit (patch) method (save data here before edit to check changes later)
}

function ShowErrorWithNotify(error: any): void {
  Loading.hide();
  let msg = "Error on N-side";

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
        .get("api/advertisements")
        .then((res) => {
          Loading.hide();
          if (res?.data) {
            this.dataN = res.data;
          }
        })
        .catch((error) => {
          ShowErrorWithNotify(error);
        });
    },
    async getById(): Promise<void> {
      if (this.data && this.data.id) {
        Loading.show();
        $axios
          .get(`api/advertisements/${this.data.id}`)
          .then((res) => {
            Loading.hide();
            if (res?.data) {
              this.data = res.data;
              Object.assign(this.dataOld, this.data);
            }
          })
          .catch((error) => {
            ShowErrorWithNotify(error);
          });
      }
    },
    async editById(): Promise<void> {
      if (this.data?.id) {
        const diff: any = {};
        // the diff object only stores changed fields:
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
        } else {
          Loading.show();
          $axios
            .patch(`api/advertisements/${this.data.id}`, diff)
            .then((res) => {
              Loading.hide();
              if (res?.data?.id) {
                this.getAll(); // refresh dataN with read all data again from backend
                Notify.create({
                  message: `Document with id=${res.data.id} has been edited successfully!`,
                  color: "positive",
                });
              }
            })
            .catch((error) => {
              ShowErrorWithNotify(error);
            });
        }
      }
    },
    async deleteById(id: any): Promise<void> {
      if (id) {
        Loading.show();
        $axios
          .delete(`api/advertisements/${id}`)
          .then(() => {
            Loading.hide();
            // this.getAll(); // refresh dataN with read all data again from backend
            // or delete edited document in dataN:
            this.dataN = this.dataN.filter((X) => X.id != id);
            Notify.create({
              message: `Document with id=${id} has been deleted successfully!`,
              color: "positive",
            });
          })
          .catch((error) => {
            ShowErrorWithNotify(error);
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
            if (res?.data) {
              Loading.hide();
              this.getAll(); // refresh dataN with read all data again from backend
              Notify.create({
                message: `New document with id=${res.data.id} has been saved successfully!`,
                color: "positive",
              });
              // router.push("/page_path");
            }
          })
          .catch((error) => {
            ShowErrorWithNotify(error);
          });
      }
    },
  },
});
