<!-- Material Design Icons: https://materialdesignicons.com/ -->

<script setup lang="ts">
  import router from "src/router";
  import { useAppStore } from "./store/appStore";
  // import { onMounted, ref } from "vue";

  const appStore = useAppStore();

  // onMounted(() => {
  // });

  function leftMenuItems() {
    return [
      {
        icon: "mdi-home",
        text: "startPage",
        name: "startPage",
        route: "/",
        disabled: false,
        separator: false,
      },
      {
        icon: "mdi-application-outline",
        text: "Empty page",
        name: "emty",
        route: "/empty",
        disabled: false,
        separator: false,
      },
    ];
  }

  function rightMenuItems() {
    return [
      {
        icon: "mdi-table",
        text: "xTable",
        name: "xtable",
        route: "/xtable",
        disabled: false,
        separator: false,
      },
      {
        icon: "mdi-card-account-details",
        text: "xCard",
        name: "xcard",
        route: "/xcard",
        disabled: false,
        separator: false,
      },
      {
        icon: "mdi-card-account-details-outline",
        text: "xCard2",
        name: "xcard2",
        route: "/xcard2",
        disabled: false,
        separator: false,
      },
      {
        icon: "mdi-view-carousel-outline",
        text: "xCarousel",
        name: "xcard",
        route: "/xcarousel",
        disabled: false,
        separator: false,
      },
      // {
      //   icon: "mdi-soccer",
      //   text: "examples",
      //   name: "examples",
      //   route: "/examples",
      //   disabled: false,
      //   separator: false,
      // },
      // {
      //   icon: "mdi-grid",
      //   text: "gridDemo",
      //   name: "gridDemo",
      //   route: "/grid",
      //   disabled: false,
      //   separator: false,
      // },
      // {
      //   icon: "mdi-account",
      //   text: "account",
      //   name: "account",
      //   route: "/account",
      //   disabled: false,
      //   separator: false,
      // },
      // {
      //   icon: "mdi-information",
      //   text: "about",
      //   name: "about",
      //   route: "/about",
      //   disabled: false,
      //   separator: false,
      // },
      {
        icon: "mdi-lifebuoy",
        text: "x-help",
        name: "xhelp",
        route: "/xhelp",
        disabled: false,
        separator: true,
      },
    ];
  }
</script>

<template>
  <div class="q-pa-md">
    <q-layout view="hHh LpR fFf">
      <!-- Menu bar -->
      <q-header
        v-model="appStore.showMenuBar"
        class="bg-primary text-white text-left"
        elevated
        reveal
      >
        <q-toolbar>
          <q-btn
            dense
            flat
            icon="mdi-menu"
            round
            @click="appStore.showLeftDrawer = !appStore.showLeftDrawer"
          />
          <q-toolbar-title
            class="my-title"
            style="cursor: pointer"
            @click="router.push({ path: '/' })"
          >
            <q-avatar>
              <img src="./assets/Jedlik_small.png" />
            </q-avatar>
            Jedlik
          </q-toolbar-title>
          <q-btn flat icon="mdi-theme-light-dark" @click="$q.dark.toggle" />
          <q-btn
            dense
            flat
            icon="mdi-menu"
            round
            @click="appStore.showRightDrawer = !appStore.showRightDrawer"
          />
        </q-toolbar>
      </q-header>

      <!-- Left drawer -->
      <q-drawer
        v-model="appStore.showLeftDrawer"
        bordered
        :breakpoint="500"
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
        show-if-above
        :width="200"
      >
        <q-scroll-area class="fit">
          <!-- routes: -->
          <q-list>
            <template v-for="(menuItem, index) in leftMenuItems()" :key="index">
              <q-item clickable :disable="menuItem.disabled" :to="menuItem.route">
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.text }}
                </q-item-section>
              </q-item>
              <q-separator v-if="menuItem.separator" :key="'sep' + index" />
            </template>
            <q-separator />
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <!--Right drawer -->
      <q-drawer
        v-model="appStore.showRightDrawer"
        bordered
        :breakpoint="500"
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
        show-if-above
        side="right"
        :width="200"
      >
        <q-scroll-area class="fit">
          <!-- routes: -->
          <q-list>
            <template v-for="(menuItem, index) in rightMenuItems()" :key="index">
              <q-item clickable :disable="menuItem.disabled" :to="menuItem.route">
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.text }}
                </q-item-section>
              </q-item>
              <q-separator v-if="menuItem.separator" :key="'sep' + index" />
            </template>
            <q-separator />
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-footer v-model="appStore.showTaskBar" elevated reveal>
        <q-toolbar>
          <q-toolbar-title class="text-center my-title">
            Jedlik frontend template 2023
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>

      <q-page-container id="container">
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .my-title {
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
