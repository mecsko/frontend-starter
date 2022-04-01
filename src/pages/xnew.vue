<script setup lang="ts">
  import { useStore1 } from "../store/store1";
  import { useStoreN } from "../store/storeN";
  import { date } from "quasar";
  const storeN = useStoreN();
  const store1 = useStore1();

  // Set default values

  onMounted(() => {
    store1.getAll();
    storeN.errormsg = "";
    setDefault();
  });

  function Submit() {
    if (
      storeN.data &&
      (storeN.data.titleField == "" ||
        storeN.data.descField == "" ||
        storeN.data.dateField == "" ||
        storeN.data.priceField == 0)
    ) {
      storeN.errormsg = "Please fill in all fields!";
      // Dialog.create({ titleField: "Error", message: "Please fill in all fields!" });
    } else storeN.create();
  }

  function setDefault() {
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
        <q-form @submit="Submit">
          <h5 class="text-center q-mt-lg q-mb-none">Add new advertisement</h5>
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
          <!-- <q-input v-model="r.titleField" dense label="titleField" outlined type="text" /> -->
          <q-input
            v-model="storeN.data.titleField"
            dense
            label="titleField"
            outlined
            :rules="[(v) => v != null || 'Choose!']"
            type="text"
          />
          <q-input
            v-model="storeN.data.descField"
            dense
            label="descField"
            outlined
            :rules="[(v) => v != null || 'Choose!']"
            type="textarea"
          />
          <q-input
            v-model="storeN.data.dateField"
            dense
            label="dateField"
            outlined
            :rules="[(v) => v != null || 'Choose!']"
            type="date"
          />
          <div class="row justify-end q-mb-md">
            <q-checkbox v-model="storeN.data.boolField" dense label="boolField" />
          </div>
          <q-input
            v-model="storeN.data.priceField"
            label="priceField"
            outlined
            :rules="[(v) => v != null || 'Choose!']"
            type="number"
          />
          <q-input
            v-model="storeN.data.imgField"
            label="imgField"
            outlined
            :rules="[(v) => v != null || 'Choose!']"
            type="url"
          />
          <div class="row justify-center">
            <q-btn class="q-mr-md" color="green" label="Submit" no-caps type="submit" />
            <q-btn color="red" label="Reset" no-caps @click="setDefault" />
          </div>

          <!-- Show/hide error message in a banner: -->
          <div class="row justify-center absolute-bottom">
            <q-banner
              v-if="storeN.errormsg"
              class="text-white bg-red q-mb-md"
              inline-actions
              rounded
            >
              <span>{{ storeN.errormsg }}</span>
              <template #action>
                <q-btn flat icon="close" round @click="storeN.errormsg = ''" />
              </template>
            </q-banner>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
