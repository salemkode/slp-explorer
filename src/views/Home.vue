<template>
  <div class="home">
    <Hero />
    <LastTranction />
    <Exchanges />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Hero from "@/components/home/Hero.vue";
import LastTranction from "@/components/home/LastTranction.vue";
import Exchanges from "@/components/home/Exchanges.vue";

export default defineComponent({
  name: "Home",
  components: { Hero, LastTranction, Exchanges },
});
</script>
