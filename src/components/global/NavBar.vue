<template>
  <header>
    <nav-search />
    <nav class="navbar container">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/images/slp-logo.svg" alt="" />
      </router-link>
      <div class="m-2">
        <ul class="navbar-nav">
          <li v-for="(router, key) in routers" :key="key" class="nav-item">
            <app-link v-text="$t(key)" :to="router" class="nav-link" />
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import AppLink from "@/components/global/AppLink.vue";
import NavSearch from "@/components/global/search/NavSearch.vue";

//
export default defineComponent({
  components: { AppLink, NavSearch },
  setup() {
    const routers = {};

    //
    return { routers };
  },
});
</script>

<style scoped>
.navbar .navbar-brand img {
  width: 50px;
}

.navbar .navbar-nav {
  align-items: center;
  flex-direction: row;
}

.navbar .navbar-nav :not(:first-child, :last-child) {
  margin: 0 10px;
}

.navbar .navbar-nav .nav-link {
  transition: color 1s;
  color: inherit;
  padding: 0;
}

.navbar .navbar-nav .nav-link.active {
  color: var(--bs-green);
}
</style>
