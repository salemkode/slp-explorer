<template>
  <NavBar />
  <div class="page">
    <router-view v-slot="{ Component }" :key="$route.fullPath">
      <transition mode="out-in" name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import NavBar from "@/components/global/NavBar.vue";
import Footer from "@/components/global/Footer.vue";

export default defineComponent({
  components: { NavBar, Footer },
});
</script>
