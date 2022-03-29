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

  //  if JSON-server return with object type field:
  // field: (row: any) => row.category.nameField,
  const columns: any[] = [
    { name: "id", label: "id", field: "id", sortable: false },
    {
      name: "category",
      label: "category",
      field: (row: any) => row.category.nameField,
      sortable: true,
      align: "center",
    },
    { name: "titleField", label: "titleField", field: "titleField", sortable: true, align: "left" },
    {
      name: "descriptionField",
      label: "descriptionField",
      field: "descriptionField",
      sortable: true,
      align: "left",
    },
    {
      name: "undamagedField",
      label: "undamagedField",
      field: "undamagedField",
      sortable: true,
      align: "center",
    },
    {
      name: "pictureField",
      label: "pictureField",
      field: "pictureField",
      sortable: true,
      align: "center",
    },
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
        <template #body-cell-undamagedField="props">
          <q-td :props="props">
            <q-badge v-if="props.value" color="green" label="Yes" outline />
            <q-badge v-else color="red" label="No" outline />
          </q-td>
        </template>

        <template #body-cell-pictureField="props">
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
