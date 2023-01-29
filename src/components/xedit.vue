<script setup lang="ts">
  import { useAppStore } from "../store/appStore";
  import { useStore1 } from "../store/store1";
  import { useStoreN } from "../store/storeN";
  import { Dialog } from "quasar";
  // import { onMounted } from "vue";
  // import router from "src/router";

  const appStore = useAppStore();
  const storeN = useStoreN();
  const store1 = useStore1();

  function ShowDialog() {
    store1.getAll();
    storeN.getById();
  }

  function HideDialog() {
    storeN.data = {};
  }

  function Submit() {
    Dialog.create({
      title: "Confirm",
      message: "Would you like to save changes?",
      cancel: true,
      persistent: true,
    })
      .onOk(() => {
        storeN.editById();
        // router.push("/xcard");
      })
      .onCancel(() => {
        // router.push("/xcard");
      });
  }

  function Reset() {
    storeN.data = { ...storeN.dataOld };
  }

  function Close() {
    appStore.showEditDialog = false;
  }
</script>

<template>
  <q-dialog v-model="appStore.showEditDialog" persistent @hide="HideDialog()" @show="ShowDialog()">
    <q-card class="q-pa-md" style="width: 60vw; min-width: 300px">
      <q-form @reset="Reset()" @submit="Submit()">
        <div class="row">
          <div v-if="storeN.data" class="col-12 q-gutter-md">
            <h5 class="text-center q-mt-sm q-mb-none">
              Edit advertisement ({{ Object.keys(storeN.data).length }})
            </h5>
            <q-select
              v-model="storeN.data.categoryId"
              clearable
              emit-value
              filled
              label="categoryNameField"
              map-options
              option-label="categoryNameField"
              option-value="id"
              :options="store1.data1"
              :rules="[(v) => v != null || 'Please choose one!']"
            />
            <q-input
              v-model="storeN.data.titleField"
              filled
              label="titleField"
              :rules="[(v) => (v != null && v != '') || 'Please fill in!']"
              type="text"
            />
            <q-input
              v-model="storeN.data.descField"
              filled
              label="descField"
              :rules="[(v) => (v != null && v != '') || 'Please fill in!']"
              type="textarea"
            />
            <q-input
              v-model="storeN.data.dateField"
              clearable
              filled
              label="dateField"
              :rules="[(v) => (v != null && v != '') || 'dateField - Choose!']"
              type="date"
            />
            <div class="row justify-end q-mb-md">
              <q-checkbox v-model="storeN.data.boolField" filled label="boolField" />
            </div>
            <q-input
              v-model="storeN.data.priceField"
              filled
              label="priceField"
              :rules="[(v) => (v != null && v != '') || 'Please fill in!']"
              type="number"
            />
            <q-input
              v-model="storeN.data.imgField"
              clearable
              filled
              label="imgField"
              :rules="[(v) => (v != null && v != '') || 'Please fill in!']"
              type="url"
            />
            <div class="row justify-center">
              <q-btn class="q-mr-md" color="green" label="Save" no-caps type="submit" />
              <q-btn class="q-mr-md" color="red" label="Reset" no-caps type="reset" />
              <q-btn class="q-mr-md" color="blue" label="Close" no-caps @click="Close()" />
            </div>
            <!-- {{ storeN.data }} -->
          </div>
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped></style>
