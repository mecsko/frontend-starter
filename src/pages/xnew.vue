<script setup lang="ts">
  import { useStore1 } from "../store/store1";
  import { useStoreN } from "../store/storeN";
  import { date } from "quasar";
  const storeN = useStoreN();
  const store1 = useStore1();

  const r = reactive({
    category: { value: null, label: "Please choose!" },
    titleField: "",
    descriptionField: "",
    dateOfAdField: date.formatDate(new Date(), "YYYY-MM-DD"),
    undamagedField: false,
    priceField: 0,
    pictureField: "http://elit.jedlik.eu/nits/hahu/01.jpg",
  });

  onMounted(() => {
    store1.getAll();
  });

  function Submit() {
    if (
      r.titleField == "" ||
      r.descriptionField == "" ||
      r.dateOfAdField == "" ||
      r.priceField == 0
    ) {
      storeN.errormsg = "Please fill in all fields!";
      // Dialog.create({ titleField: "Error", message: "Please fill in all fields!" });
    } else storeN.create(r);
    // storeN.create(r);
  }

  function Reset() {
    r.category = { value: null, label: "Válasszon!" };
    r.titleField = "";
    r.descriptionField = "";
    r.dateOfAdField = date.formatDate(new Date(), "YYYY-MM-DD");
    r.undamagedField = false;
    r.priceField = 0;
    r.pictureField = "http://elit.jedlik.eu/nits/hahu/01.jpg";
    storeN.errormsg = "";
  }
</script>

<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4 q-gutter-md">
        <h5 class="text-center q-mt-lg q-mb-none">Add new advertisement</h5>
        <q-select
          v-model="r.category"
          clearable
          dense
          label="Vehicle type"
          :options="store1.data1.map((c) => ({ value: c.id, label: c.nameField }))"
          outlined
        />
        <q-input v-model="r.titleField" dense label="titleField" outlined type="text" />
        <q-input
          v-model="r.descriptionField"
          dense
          label="descriptionField"
          outlined
          type="textarea"
        />
        <q-input v-model="r.dateOfAdField" dense label="Date of ad" outlined type="date" />
        <div class="row justify-end">
          <q-checkbox v-model="r.undamagedField" dense label="undamagedField" />
        </div>
        <q-input v-model="r.priceField" label="priceField" outlined type="number" />
        <q-input v-model="r.pictureField" label="pictureField" outlined type="url" />
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
