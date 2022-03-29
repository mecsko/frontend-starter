<script setup lang="ts">
  import { useStore1 } from "../store/store1";
  import { useStoreN } from "../store/storeN";
  import { date } from "quasar";
  const storeN = useStoreN();
  const store1 = useStore1();

  const r = reactive({
    category: { value: null, label: "Válasszon!" },
    title: "",
    description: "",
    dateOfAd: date.formatDate(new Date(), "YYYY-MM-DD"),
    undamaged: false,
    price: 0,
    picture: "http://elit.jedlik.eu/nits/hahu/01.jpg",
  });

  onMounted(() => {
    store1.getAll();
  });

  function Submit() {
    if (r.title == "" || r.description == "" || r.dateOfAd == "" || r.price == 0) {
      storeN.errormsg = "Please fill in all fields!";
      // Dialog.create({ title: "Error", message: "Please fill in all fields!" });
    } else storeN.create(r);
  }

  function Reset() {
    r.category = { value: null, label: "Válasszon!" };
    r.title = "";
    r.description = "";
    r.dateOfAd = date.formatDate(new Date(), "YYYY-MM-DD");
    r.undamaged = false;
    r.price = 0;
    r.picture = "http://elit.jedlik.eu/nits/hahu/01.jpg";
    storeN.errormsg = "";
  }
</script>

<template>
  <q-page>
    <div class="row justify-center content-center">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4 q-gutter-y-md">
        <h5 class="text-center q-mt-xl">Add new advertisement</h5>
        <q-select
          v-model="r.category"
          clearable
          label="Vehicle type"
          :options="store1.data1.map((c) => ({ value: c.id, label: c.name }))"
          outlined
          :rules="[(val) => val != null || 'The vehicle type must be entered!']"
        />
        <q-input v-model="r.title" label="Title" outlined type="text" />
        <q-input v-model="r.description" label="Description" outlined type="textarea" />
        <q-input v-model="r.dateOfAd" label="Date of ad" outlined type="date" />
        <div class="row justify-end">
          <q-checkbox v-model="r.undamaged" label="Undamaged" />
        </div>
        <q-input v-model="r.price" label="Price" outlined type="number" />
        <q-input v-model="r.picture" label="Picture" outlined type="url" />
        <div class="row justify-center">
          <q-btn class="q-mr-md" color="green" label="Submit" no-caps @click="Submit" />
          <q-btn color="red" label="Reset" no-caps @click="Reset" />
        </div>
        <q-banner v-if="storeN.errormsg != ''" class="text-white bg-red" inline-actions rounded>
          <span>{{ storeN.errormsg }}</span>
          <template #action>
            <q-btn flat icon="close" round @click="storeN.errormsg = ''" />
          </template>
        </q-banner>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
