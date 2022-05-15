<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    <slot />
  </a>
  <router-link v-else :to="to" v-bind="$attrs">
    <slot />
  </router-link>
</template>

<script lang="ts">
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
      return typeof this.to === "string" && this.to?.startsWith("http");
    },
  },
});
</script>
