<script setup lang="ts">
	import { onMounted, ref } from "vue";
	import { useAppStore } from "@stores/app";
	import { useManyStore } from "@stores/many";
	import type { QTableColumn } from "quasar";
	import type { IMany } from "@interfaces/many";

	const appStore = useAppStore();
	const manyStore = useManyStore();

	// Selected row(s) -> selection="single" or selection="multiple"
	const selected = ref<IMany[]>([]);

	async function deleteRecord() {
		manyStore.document = { id: selected.value[0].id };
		await manyStore.many_DeleteById();
		selected.value = [];
	}

	async function filterUpdate() {
		if (appStore.filter.length > 0) {
			await manyStore.many_Filter();
		} else {
			await manyStore.many_GetAll();
		}
	}

	// Columns def template:
	// const cols: QTableColumn[] = [
	//   { name: "", label: "", field: "", align:"center" },
	// ];

	/*  Slot for table column
    <template #body-cell-fieldName="props">
		<q-td :props="props">
		</q-td>
    </template>
  */

	// JSON-server and MongoDb-populate() return field(s) with object type from the "1"-side:
	// field: (row: any) => row.category.categoryNameField,

	// sort with: sortable: true
	// align with (default right): align: "center"
	const columns: QTableColumn<IMany>[] = [
		{ name: "id", label: "id", field: "id", align: "left" },
		{ name: "categoryId", label: "categoryId", field: "categoryId" },
		{ name: "titleField", label: "titleField", field: "titleField", align: "left" },
		{ name: "descField", label: "descField", field: "descField", align: "left" },
		{ name: "dateField", label: "dateField", field: "dateField", align: "left" },
		{ name: "boolField", label: "boolField", field: "boolField", align: "center" },
		{ name: "priceField", label: "priceField", field: "priceField" },
		{
			name: "category",
			label: "category",
			field: (row: any) => row.category.categoryNameField,
			align: "center",
		},
		{ name: "imgField", label: "imgField", field: "imgField", align: "center" },
	];

	onMounted(async () => {
		await manyStore.many_GetAll();
	});
</script>

<template>
	<q-page>
		<div class="q-pa-md">
			<q-input v-model="appStore.filter" dense filled label="Filter" type="text" @update:model-value="filterUpdate()" />
			<q-table
				v-model:selected="selected"
				:columns="columns"
				dense
				:rows="manyStore.documents"
				selection="single"
				title="Advertisements"
				wrap-cells
			>
				<!-- slot1: -->
				<template #body-cell-boolField="props">
					<q-td :props="props">
						<q-badge v-if="props.value" color="green" label="Yes" outline />
						<q-badge v-else color="red" label="No" outline />
					</q-td>
				</template>
				<!-- slot2: -->
				<template #body-cell-imgField="props">
					<q-td :props="props">
						<img :src="props.value" style="max-height: 100px" />
					</q-td>
				</template>
			</q-table>
			<!-- Button for delete selected record: -->
			<div class="row justify-center q-ma-md">
				<q-btn v-show="selected.length != 0" color="red" label="Delete selected record" no-caps @click="deleteRecord()" />
			</div>
		</div>
	</q-page>
</template>

<style lang="scss" scoped></style>
