<script setup lang="ts">
  import { useStoreN } from "../store/storeN";

  const storeN = useStoreN();

  onMounted(() => {
    storeN.getAll();
  });
</script>

<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div v-for="e in storeN.dataN" :key="e.id" class="col-sm-12 col-md-6 col-lg-4">
        <q-card class="q-ma-md">
          <q-img :src="e.picture">
            <div class="text-h7 absolute-top text-right">
              {{ e.category.name }} -
              {{ new Date(e.dateOfAd).toLocaleDateString() }}
            </div>
          </q-img>
          <q-card-section>
            <q-badge v-if="e.undamaged" color="green" label="Undamaged!" outline />
            <q-badge v-else color="red" label="Damaged!" outline />
            {{ e.description }}
          </q-card-section>
          <q-card-actions align="center">
            <q-btn color="blue">I'm interested</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
