<script setup lang="ts">
  import { useStore1 } from "../store/store1";
  import { useStoreN } from "../store/storeN";
  import { Dialog } from "quasar";
  import router from "src/router";

  const storeN = useStoreN();
  const store1 = useStore1();

  onMounted(() => {
    if (storeN.data.id === undefined) {
      router.push({ name: "xcard" });
    } else {
      store1.getAll();
      storeN.getById();
    }
  });

  onUnmounted(() => {
    storeN.data = {};
  });

  function Submit() {
    Dialog.create({
      title: "Confirm",
      message: "Would you like to save changes?",
      cancel: true,
      persistent: true,
    })
      .onOk(() => {
        storeN.editById();
        router.push({ name: "xcard" });
      })
      .onCancel(() => {
        // router.push({ name: "xcard" });
      });
  }
</script>

<template>
  <q-page>
    <div class="row justify-center">
      <div v-if="storeN.data" class="col-12 col-sm-8 col-md-6 col-lg-4 q-gutter-md">
        <q-form @submit="Submit">
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
            <q-btn class="q-mr-md" color="green" label="Submit" no-caps type="submit" />
          </div>
          {{ storeN.data }}
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
