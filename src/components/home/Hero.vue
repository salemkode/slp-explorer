<template>
  <div class="pb-5 pt-1">
    <div class="container hero">
      <div class="row align-items-center">
        <div class="left col-md-8">
          <h3 class="index_page_header" v-text="$t('index_page_header')" />
          <p v-text="$t('index_page_subheader')" />
          <div class="search-warp">
            <group-search />
          </div>
        </div>
        <div class="right col-md-4">
          <img
            class="d-block w-100 p-5"
            src="@/assets/images/confirmation.svg"
            alt=""
          />
        </div>
      </div>
      <analytics-container :items="analyticsCardsItem" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GroupSearch from "@/components/global/search/GroupSearch.vue";
import AnalyticsContainer from "@/components/global/analytics/AnalyticsContainer.vue";

export default defineComponent({
  name: "Home-Hero",
  components: {
    GroupSearch,
    AnalyticsContainer,
  },
  setup() {
    const analyticsCardsItem = [
      { title: "tokens_created", value: null },
      { title: "index_page_token_burns", value: null },
      { title: "transactions", value: null },
    ];

    return { analyticsCardsItem };
  },
});
</script>

<style scoped>
.hero > * {
  margin-top: 15px;
}

.hero .index_page_header {
  color: var(--bs-green);
}

.hero .sub-buttons > * {
  margin-right: 8px;
}

@media (min-width: 768px) {
  .hero .search-warp {
    padding-right: 3rem;
  }
}
</style>
