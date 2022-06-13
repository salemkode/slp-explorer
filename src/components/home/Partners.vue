<template>
  <row-container :image-size="150" :title="$t('index_page_partners')">
    <a
      class="partners"
      v-for="partner in partners"
      :key="partner.url"
      :href="partner.url"
    >
      <img :src="partner.image" alt="" class="partners-image" />
    </a>
  </row-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import rowContainer from "@/components/home/rowContainer.vue";

//
export default defineComponent({
  name: "Partners",
  components: { rowContainer },
  setup() {
    const partners = [
      {
        image: "/image/partners/fullstack.png",
        url: "https://fullstack.cash",
      },
    ];

    return { partners };
  },
});
</script>

<style scoped>
.partners .partners-image {
  height: 150px;
  width: auto;
}
</style>
