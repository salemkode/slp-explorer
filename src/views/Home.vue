<template>
  <div class="home">
    <Hero />
    <div class="helper-info container">
      <h2 class="mb-3">Explorer pages</h2>
      <br />
      <div v-for="(item, key) in infoUrls" :key="key" class="my-4">
        <h3>{{ key }} Page</h3>
        <div>
          <p class="m-0">
            <code>
              {{ item.title }}
            </code>
            For example
          </p>
          <app-link :to="item.url"> {{ item.url }} </app-link>
        </div>
      </div>
    </div>
    <Sponsors />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

// Components
import Hero from "@/components/home/Hero.vue";
import Sponsors from "@/components/home/Sponsors.vue";
import AppLink from "@/components/global/AppLink.vue";

//
export default defineComponent({
  name: "Home",
  components: { Hero, Sponsors, AppLink },
  setup() {
    const infoUrls = reactive<{
      [key: string]: { title: string; url: string };
    }>({
      Token: {
        title: "/token/:tokenid",
        url: "/token/7a427a156fe70f83d3ccdd17e75804cc0df8c95c64ce04d256b3851385002a0b",
      },
      Transaction: {
        title: "/tx/:txid",
        url: "/tx/7a427a156fe70f83d3ccdd17e75804cc0df8c95c64ce04d256b3851385002a0b",
      },
      Address: {
        title: "/address/:address",
        url: "/address/simpleledger:qzmd5vxgh9m22m6fgvm57yd6kjnjl9qnwyztz2p80d",
      },
    });

    return {
      infoUrls,
    };
  },
});
</script>

<style scoped>
.helper-info * {
  text-overflow: ellipsis;
  overflow: hidden;
}

code {
  display: block;
  margin: 5px 0;
  padding: 10px;
  border-radius: 4px;
  background: #41444e;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #fff;
}
</style>
