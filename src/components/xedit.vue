<script setup lang="ts">
  import { useStore } from "../store/store";
  import { Dialog } from "quasar";
  // import { onMounted } from "vue";
  // import router from "src/router";

  const store = useStore();

  function ShowDialog() {
    store.oneGetAll();
    store.manyGetById();
  }

  function HideDialog() {
    store.many.document = {};
  }

  function Submit() {
    Dialog.create({
      title: "Confirm",
      message: "Would you like to save changes?",
      cancel: true,
      persistent: true,
    })
      .onOk(() => {
        store.manyEditById();
        // router.push("/xcard");
      })
      .onCancel(() => {
        // router.push("/xcard");
      });
  }

  function Reset() {
    store.many.document = { ...store.many.documentOld };
  }

  function Close() {
    store.app.showEditDialog = false;
  }
</script>

<template>
  <q-dialog v-model="store.app.showEditDialog" persistent @hide="HideDialog()" @show="ShowDialog()">
    <q-card class="q-pa-md" style="width: 60vw; min-width: 300px">
      <q-form @reset="Reset()" @submit="Submit()">
        <div class="row">
          <div v-if="store?.many?.document?.id" class="col-12 q-gutter-md">
            <h5 class="text-center q-mt-sm q-mb-none">
              Edit advertisement ({{ Object.keys(store.many.document).length }})
            </h5>
            <q-select
              v-model="store.many.document.categoryId"
              clearable
              emit-value
              filled
              label="categoryNameField"
              map-options
              option-label="categoryNameField"
              option-value="id"
              :options="store.one.documents"
              :rules="[(v) => v != null || 'Please choose one!']"
            />
            <q-input
              v-model="store.many.document.titleField"
              filled
              label="titleField"
              :rules="[(v) => (v != null && v != '') || 'Please fill in!']"
              type="text"
            />
            <q-input
              v-model="store.many.document.descField"
              filled
              label="descField"
              :rules="[(v) => (v != null && v != '') || 'Please fill in!']"
              type="textarea"
            />
            <q-input
              v-model="store.many.document.dateField"
              clearable
              filled
              label="dateField"
              :rules="[(v) => (v != null && v != '') || 'dateField - Choose!']"
              type="date"
            />
            <div class="row justify-end q-mb-md">
              <q-checkbox v-model="store.many.document.boolField" filled label="boolField" />
            </div>
            <q-input
              v-model="store.many.document.priceField"
              filled
              label="priceField"
              :rules="[(v) => (v != null && v != '') || 'Please fill in!']"
              type="number"
            />
            <q-input
              v-model="store.many.document.imgField"
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
