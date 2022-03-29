<script setup lang="ts">
  import { useStoreN } from "../store/storeN";
  const storeN = useStoreN();

  onMounted(() => {
    storeN.getAll();
  });

  const selected = ref<any>([]);

  function deleteRecord(): void {
    storeN.deleteById({ id: selected.value[0].id });
    selected.value = [];
  }

  const columns: any[] = [
    { name: "id", label: "id", field: "id", sortable: true },
    {
      name: "category",
      label: "Category",
      field: (row: any) => row.category.name,
      sortable: true,
      align: "center",
    },
    { name: "title", label: "Title", field: "title", sortable: true, align: "left" },
    {
      name: "decription",
      label: "Description",
      field: "description",
      sortable: true,
      align: "left",
    },
    {
      name: "undamaged",
      label: "Undamaged",
      field: "undamaged",
      sortable: true,
      align: "center",
    },
    { name: "picture", label: "Picture", field: "picture", sortable: true, align: "center" },
  ];
</script>

<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        v-model:selected="selected"
        :columns="columns"
        dense
        :rows="storeN.dataN"
        selection="single"
        title="Advertisements"
        wrap-cells
      >
        <template #body-cell-undamaged="props">
          <q-td :props="props">
            <q-badge v-if="props.value" color="green" label="Yes" outline />
            <q-badge v-else color="red" label="No" outline />
          </q-td>
        </template>

        <template #body-cell-picture="props">
          <q-td :props="props">
            <img :src="props.value" style="max-height: 100px" />
          </q-td>
        </template>
      </q-table>
      <div class="row justify-center q-ma-md">
        <q-btn
          v-show="selected.length != 0"
          color="red"
          label="Delete selected record"
          no-caps
          @click="deleteRecord"
        />
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
