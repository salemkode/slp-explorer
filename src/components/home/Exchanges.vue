<template>
  <row-container :image-size="150" :title="$t('index_page_sponsors')">
    <a v-for="sponsor in sponsors" :key="sponsor.url" :href="sponsor.url">
      <img :src="sponsor.image" alt="" />
    </a>
  </row-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import rowContainer from "@/components/home/rowContainer.vue";

//
export default defineComponent({
  name: "Sponsors",
  components: { rowContainer },
  setup() {
    const sponsors = [
      {
        image: "/image/sponsors/fullstack.png",
        url: "https://fullstack.cash",
      },
    ];

    return { sponsors };
  },
});
</script>
