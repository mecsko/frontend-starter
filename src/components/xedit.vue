<script setup lang="ts">
	// import { onMounted } from "vue";
	import { Dialog } from "quasar";
	import { useAppStore } from "@stores/app";
	import { useOneStore } from "@stores/one";
	import { useManyStore } from "@stores/many";
	// import router from "@modules/router";

	const appStore = useAppStore();
	const oneStore = useOneStore();
	const manyStore = useManyStore();

	async function ShowDialog() {
		await oneStore.one_GetAll(); // for q-selet data
		await manyStore.many_GetById(); // Before show dialog set "store.many.document.id" field!!!
	}

	function HideDialog() {
		manyStore.document = {};
	}

	async function Submit() {
		Dialog.create({
			title: "Confirm",
			message: "Would you like to save changes?",
			cancel: true,
			persistent: true,
		})
			.onOk(async () => {
				const success = await manyStore.many_EditById();
				console.log(success);
				if (success != false) {
					appStore.showEditDialog = false;
				}
				// router.push("/xcard");
			})
			.onCancel(() => {
				// router.push("/xcard");
			});
	}

	function Reset() {
		manyStore.document = { ...manyStore.documentOld };
	}

	function Close() {
		appStore.showEditDialog = false;
	}
</script>

<template>
	<q-dialog v-model="appStore.showEditDialog" persistent @hide="HideDialog" @show="ShowDialog">
		<q-card class="q-pa-md" style="width: 60vw; min-width: 300px">
			<q-form @reset="Reset" @submit.prevent="Submit">
				<div class="row">
					<div v-if="manyStore.document?.id" class="col-12 q-gutter-md">
						<h5 class="text-center q-mt-sm q-mb-none">Edit advertisement</h5>
						<q-select
							v-model="manyStore.document.categoryId"
							clearable
							emit-value
							filled
							label="categoryNameField"
							map-options
							option-label="categoryNameField"
							option-value="id"
							:options="oneStore.documents"
							:rules="[(v) => v != null || 'Please choose one!']"
						/>
						<q-input
							v-model="manyStore.document.titleField"
							filled
							label="titleField"
							:rules="[(v) => (v != null && v != '') || 'Please fill in!']"
							type="text"
						/>
						<q-input
							v-model="manyStore.document.descField"
							filled
							label="descField"
							:rules="[(v) => (v != null && v != '') || 'Please fill in!']"
							type="textarea"
						/>
						<q-input
							v-model="manyStore.document.dateField"
							clearable
							filled
							label="dateField"
							:rules="[(v) => (v != null && v != '') || 'dateField - Choose!']"
							type="date"
						/>
						<div class="row justify-end q-mb-md">
							<q-checkbox v-model="manyStore.document.boolField" filled label="boolField" />
						</div>
						<q-input
							v-model="manyStore.document.priceField"
							filled
							label="priceField"
							:rules="[(v) => (v != null && v != '') || 'Please fill in!']"
							type="number"
						/>
						<q-input
							v-model="manyStore.document.imgField"
							clearable
							filled
							label="imgField"
							:rules="[(v) => (v != null && v != '') || 'Please fill in!']"
							type="url"
						/>
						<div class="row justify-center">
							<q-btn class="q-mr-md" color="green" label="Save" no-caps type="submit" />
							<q-btn class="q-mr-md" color="red" label="Reset" no-caps type="reset" />
							<q-btn class="q-mr-md" color="blue" label="Close" no-caps @click="Close" />
						</div>
						<!-- {{ storeN.data }} -->
					</div>
				</div>
			</q-form>
		</q-card>
	</q-dialog>
</template>

<style lang="scss" scoped></style>
