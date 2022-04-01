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
    storeN.errormsg = "";
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
        storeN.data = {};
        router.push({ name: "xcard" });
      });
  }
</script>

<template>
  <q-page>
    <div class="row justify-center">
      <div v-if="storeN.data" class="col-12 col-sm-8 col-md-6 col-lg-4 q-gutter-md">
        <q-form @submit="Submit">
          <h5 class="text-center q-mt-lg q-mb-none">Edit advertisement</h5>
          <q-select
            v-model="storeN.data.categoryId"
            clearable
            dense
            emit-value
            label="Vehicle type"
            map-options
            option-label="nameField"
            option-value="id"
            :options="store1.data1"
            outlined
            :rules="[(v) => v != null || 'Choose!']"
          />
          <q-input v-model="storeN.data.titleField" dense label="titleField" outlined type="text" />
          <q-input
            v-model="storeN.data.descField"
            dense
            label="descField"
            outlined
            type="textarea"
          />
          <q-input v-model="storeN.data.dateField" dense label="dateField" outlined type="date" />
          <div class="row justify-end">
            <q-checkbox v-model="storeN.data.boolField" dense label="boolField" />
          </div>
          <q-input v-model="storeN.data.priceField" label="priceField" outlined type="number" />
          <q-input v-model="storeN.data.imgField" label="imgField" outlined type="url" />
          <div class="row justify-center">
            <q-btn class="q-mr-md" color="green" label="Submit" no-caps type="submit" />
          </div>
          {{ storeN.data }}
        </q-form>
      </div>

      <!-- Show/hide error message in a banner: -->
      <!-- <div class="row justify-center absolute-bottom">
        <q-banner v-if="storeN.errormsg" class="text-white bg-red q-mb-md" inline-actions rounded>
          <span>{{ storeN.errormsg }}</span>
          <template #action>
            <q-btn flat icon="close" round @click="storeN.errormsg = ''" />
          </template>
        </q-banner>
      </div> -->
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
