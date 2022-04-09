<script setup lang="ts">
  import { useStore1 } from "../store/store1";
  import { useStoreN } from "../store/storeN";
  import { date, Dialog } from "quasar";
  import router from "src/router";

  const storeN = useStoreN();
  const store1 = useStore1();

  // Set default values:
  onMounted(() => {
    store1.getAll();
    storeN.data = {};
    onReset(); // set default settings
  });

  onUnmounted(() => {
    storeN.data = {};
  });

  function onSubmit() {
    Dialog.create({
      title: "Confirm",
      message: "Would you like to save new document?",
      cancel: true,
      persistent: true,
    })
      .onOk(() => {
        storeN.create();
        router.push({ name: "xcard" });
      })
      .onCancel(() => {
        // router.push({ name: "xcard" });
      });
  }

  function onReset() {
    storeN.data = {
      dateField: date.formatDate(new Date(), "YYYY-MM-DD"),
      imgField: "http://elit.jedlik.eu/nits/hahu/01.jpg",
      boolField: false,
    };
  }
</script>

<template>
  <q-page>
    <div v-if="storeN.data" class="row justify-center">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4">
        <q-form @reset="onReset" @submit="onSubmit">
          <h5 class="text-center q-mt-sm q-mb-none">
            Add new advertisement ({{ Object.keys(storeN.data).length }})
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
            mask="currency"
            :rules="[(v) => (v != null && v != '') || 'Please fill in!']"
            thousands-separator=" "
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
            <q-btn color="red" label="Reset" no-caps type="reset" />
          </div>
          {{ storeN.data }}
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
