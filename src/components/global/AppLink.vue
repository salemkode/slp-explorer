<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="url" target="_blank">
    <slot />
  </a>
  <router-link v-else :to="url" v-bind="$attrs">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { gatewayUrl, isIpfs } from "@/modules/ipfs";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppLink",
  inheritAttrs: false,
  props: {
    to: {
      type: String,
    },
    inactiveClass: String,
  },

  computed: {
    isExternalLink(): boolean {
      return typeof this.url === "string" && this.url.startsWith("http");
    },
    url() {
      if (this.to && isIpfs(this.to)) {
        return gatewayUrl(this.to);
      } else {
        return this.to;
      }
    },
  },
});
</script>
