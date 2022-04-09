<script setup lang="ts">
  import { useStore1 } from "../store/store1";
  import { useStoreN } from "../store/storeN";
  import { Dialog } from "quasar";

  const store1 = useStore1();
  const storeN = useStoreN();

  const showEditDialog = ref(false);

  onMounted(() => {
    storeN.getAll();
  });

  function editDocument(id: number) {
    storeN.data.id = id;
    store1.getAll();
    storeN.getById();
    showEditDialog.value = true;
  }

  function deleteDocument(id: number) {
    storeN.data.id = id;
    Dialog.create({
      title: "Confirm",
      message: "Would you like to delete?",
      cancel: true,
      persistent: true,
    })
      .onOk(() => {
        storeN.deleteById();
        storeN.data = {};
      })
      .onCancel(() => {
        // router.push({ name: "xcard" });
      });
  }

  function cancelEdit() {
    storeN.data = {};
    showEditDialog.value = false;
  }

  function submitEdit() {
    Dialog.create({
      title: "Confirm",
      message: "Would you like to save changes?",
      cancel: true,
      persistent: true,
    })
      .onOk(() => {
        storeN.editById();
        storeN.data = {};
        showEditDialog.value = false;
      })
      .onCancel(() => {
        // router.push({ name: "xcard" });
      });
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
            <q-btn color="blue" no-caps @click="editDocument(e.id!)">Edit</q-btn>
            <q-btn color="red" no-caps @click="deleteDocument(e.id!)">Delete</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="showEditDialog" persistent>
      <div class="row full-width justify-center bg-white q-pa-sm">
        <div class="col-xs-12 q-gutter-md">
          <q-form @reset="cancelEdit" @submit="submitEdit">
            <h5 class="text-center q-mt-sm q-mb-none">
              Edit advertisement ({{ Object.keys(storeN.data).length }})
            </h5>
            <q-select
              v-model="storeN.data.categoryId"
              clearable
              emit-value
              filled
              label="categoryNameField"
              map-options
              option-label="categoryNameField"
              option-value="id"
              :options="store1.data1"
              :rules="[(v) => v != null || 'Please choose one!']"
            />
            <q-input
              v-model="storeN.data.titleField"
              filled
              label="titleField"
              :rules="[(v) => (v != null && v != '') || 'Please fill in!']"
              type="text"
            />
            <q-input
              v-model="storeN.data.descField"
              filled
              label="descField"
              :rules="[(v) => (v != null && v != '') || 'Please fill in!']"
              type="textarea"
            />
            <q-input
              v-model="storeN.data.dateField"
              clearable
              filled
              label="dateField"
              :rules="[(v) => (v != null && v != '') || 'dateField - Choose!']"
              type="date"
            />
            <div class="row justify-end q-mb-md">
              <q-checkbox v-model="storeN.data.boolField" filled label="boolField" />
            </div>
            <q-input
              v-model="storeN.data.priceField"
              filled
              label="priceField"
              :rules="[(v) => (v != null && v != '') || 'Please fill in!']"
              type="number"
            />
            <q-input
              v-model="storeN.data.imgField"
              clearable
              filled
              label="imgField"
              :rules="[(v) => (v != null && v != '') || 'Please fill in!']"
              type="url"
            />
            <div class="row justify-center">
              <q-btn class="q-mr-md" color="green" label="Save" no-caps type="submit" />
              <q-btn class="q-mr-md" color="red" label="Cancel" no-caps type="reset" />
            </div>
            <!-- {{ storeN.data }} -->
          </q-form>
        </div>
      </div>
    </q-dialog>
  </q-page>
</template>

<style scoped></style>
