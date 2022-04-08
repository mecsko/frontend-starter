<script setup lang="ts">
  import { useRouter } from "vue-router";

  import generatedRoutes from "virtual:generated-pages";
  const router = useRouter();

  const leftDrawerOpen = ref<boolean>(true);
  const toolbarShow = ref<boolean>(true);
  const hiddenPages = ref<string[]>(["répa", "körte"]);

  function toggleLeftDrawer(): void {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  }

  onMounted(() => {
    // show left drawer on start
    leftDrawerOpen.value = false;
    // show toolbar on start
    toolbarShow.value = true;
  });
</script>

<template>
  <q-layout view="hHh Lpr fFf">
    <q-header v-if="toolbarShow" class="bg-primary text-white text-left" elevated>
      <q-toolbar>
        <q-btn dense flat icon="mdi-menu" round @click="toggleLeftDrawer" />
        <q-toolbar-title id="title" style="cursor: pointer" @click="router.push({ path: '/' })">
          <q-avatar>
            <img src="src/assets/Jedlik_small.png" />
          </q-avatar>
          Szoftverfejlesztő és tesztelő vizsga - Frontend programozási feladat
        </q-toolbar-title>
        <q-btn dense flat icon="mdi-menu" round @click="toggleLeftDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered show-if-above side="left" :width="150">
      <q-list bordered class="min-w-25 pa-4" separator>
        <template v-for="(item, index) in generatedRoutes">
          <q-item
            v-if="!hiddenPages.includes(item.name as string)"
            :key="index"
            class="flex-col"
            clickable
          >
            <q-item-section class="cursor-pointer" @click="router.push({ path: item.path })">
              {{ item.name }}
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container id="container">
      <router-view v-slot="{ Component }">
        <transition mode="out-in" name="slide-fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
  .slide-fade-enter {
    transform: translateX(10px);
    opacity: 0;
  }

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.2s ease;
  }

  .slide-fade-leave-to {
    transform: translateX(-10px);
    opacity: 0;
  }

  #title {
    font-size: 10px;
    @media (min-width: 400px) {
      font-size: calc(10px + 0.5vw);
    }
    @media (min-width: 800px) {
      font-size: calc(14px + 0.5vw);
    }
    @media (min-width: 1200px) {
      font-size: calc(18px + 0.5vw);
    }
  }
</style>
