<script setup lang="ts">
  import router from "src/router";
  import { useStoreN } from "../store/storeN";

  const storeN = useStoreN();

  onMounted(() => {
    storeN.getAll();
  });

  function edit(id: number) {
    storeN.data.id = id;
    router.push({ name: "xedit" });
  }
</script>

<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div v-for="e in storeN.dataN" :key="e.id" class="col-sm-12 col-md-6 col-lg-4">
        <q-card class="q-ma-md">
          <q-img :src="e.imgField">
            <div class="text-h7 absolute-top text-right">
              {{ e.category!.categoryNameField }} -
              {{ new Date(e.dateField!).toLocaleDateString() }}
            </div>
            <div class="text-h7 absolute-bottom text-left">
              {{ e.titleField }}
            </div>
          </q-img>
          <q-card-section>
            <q-badge v-if="e.boolField" color="green" label="yes" outline />
            <q-badge v-else color="red" label="no" outline />
            {{ e.descField }}
          </q-card-section>
          <q-card-actions align="center">
            <q-btn color="blue" @click="edit(e.id!)">Edit</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
