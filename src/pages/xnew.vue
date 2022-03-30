<script setup lang="ts">
  import { useStore1 } from "../store/store1";
  import { useStoreN } from "../store/storeN";
  import { date } from "quasar";
  const storeN = useStoreN();
  const store1 = useStore1();

  storeN.data = {
    titleField: "",
    descField: "",
    dateField: date.formatDate(new Date(), "YYYY-MM-DD"),
    boolField: false,
    category: null,
  };

  // const r = reactive({
  //   category: { value: null, label: "Please choose!" },
  //   titleField: "",
  //   descField: "",
  //   dateField: date.formatDate(new Date(), "YYYY-MM-DD"),
  //   boolField: false,
  //   priceField: 0,
  //   imgField: "http://elit.jedlik.eu/nits/hahu/01.jpg",
  // });

  onMounted(() => {
    store1.getAll();
  });

  function Submit() {
    // if (r.titleField == "" || r.descField == "" || r.dateField == "" || r.priceField == 0) {
    //   storeN.errormsg = "Please fill in all fields!";
    //   // Dialog.create({ titleField: "Error", message: "Please fill in all fields!" });
    // } else storeN.create(r);
    // storeN.create(r);
  }

  function Reset() {
    // r.category = { value: null, label: "Please choose!" };
    // r.titleField = "";
    // r.descField = "";
    // r.dateField = date.formatDate(new Date(), "YYYY-MM-DD");
    // r.boolField = false;
    // r.priceField = 0;
    // r.imgField = "http://elit.jedlik.eu/nits/hahu/01.jpg";
    storeN.errormsg = "";
  }
</script>

<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4 q-gutter-md">
        <h5 class="text-center q-mt-lg q-mb-none">Add new advertisement</h5>
        <q-select
          v-model="storeN.data!.category"
          clearable
          dense
          label="Vehicle type"
          :options="store1.data1.map((c) => ({ value: c.id, label: c.nameField }))"
          outlined
        />
        <!-- <q-input v-model="r.titleField" dense label="titleField" outlined type="text" /> -->
        <q-input v-model="storeN.data!.titleField" dense label="titleField" outlined type="text" />
        <q-input
          v-model="storeN.data!.descField"
          dense
          label="descField"
          outlined
          type="textarea"
        />
        <q-input v-model="storeN.data!.dateField" dense label="Date of ad" outlined type="date" />
        <div class="row justify-end">
          <q-checkbox v-model="storeN.data!.boolField" dense label="boolField" />
        </div>
        <q-input v-model="storeN.data!.priceField" label="priceField" outlined type="number" />
        <q-input v-model="storeN.data!.imgField" label="imgField" outlined type="url" />
        <div class="row justify-center">
          <q-btn class="q-mr-md" color="green" label="Submit" no-caps @click="Submit" />
          <q-btn color="red" label="Reset" no-caps @click="Reset" />
        </div>

        <!-- Show/hide error message in a banner: -->
        <div class="row justify-center absolute-bottom">
          <q-banner v-if="storeN.errormsg" class="text-white bg-red q-mb-md" inline-actions rounded>
            <span>{{ storeN.errormsg }}</span>
            <template #action>
              <q-btn flat icon="close" round @click="storeN.errormsg = null" />
            </template>
          </q-banner>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
