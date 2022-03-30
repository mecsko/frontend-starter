<script setup lang="ts">
  import { useStore1 } from "../store/store1";
  import { useStoreN } from "../store/storeN";
  import { useRoute } from "vue-router";
  import { Dialog } from "quasar";
  import router from "src/router";

  const route = useRoute();

  const storeN = useStoreN();
  const store1 = useStore1();

  let id = route.params.id; // read parameter id (it is reactive)

  onMounted(() => {
    if (route.params.id === undefined) {
      router.push({ name: "xcard" });
    } else {
      store1.getAll();
      storeN.getById(id);
    }
  });

  function Submit() {
    Dialog.create({
      title: "Confirm",
      message: "Would you like to save changes?",
      cancel: true,
      persistent: true,
    })
      .onOk(() => {
        storeN.editPostById(id);
        router.push({ name: "xcard" });
      })
      .onCancel(() => {
        router.push({ name: "xcard" });
      });
  }
</script>

<template>
  <q-page>
    <div class="row justify-center">
      <div v-if="storeN.data" class="col-12 col-sm-8 col-md-6 col-lg-4 q-gutter-md">
        <h5 class="text-center q-mt-lg q-mb-none">Edit advertisement</h5>
        <q-input v-model="storeN.data.titleField" dense label="titleField" outlined type="text" />
        <q-input v-model="storeN.data.descField" dense label="descField" outlined type="textarea" />
        <div class="row justify-center">
          <q-btn class="q-mr-md" color="green" label="Submit" no-caps @click="Submit" />
        </div>
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
  </q-page>
</template>

<style lang="scss" scoped></style>
