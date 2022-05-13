<template>
  <div ref="searchContainer" class="search-container">
    <div class="container-feild input-group">
      <input
        type="text"
        :placeholder="$t('search_placeholder')"
        v-model="searchWord"
        class="form-control"
      />
      <button class="btn btn-outline-secondary" @click="search">
        <i class="fi fi-rr-search"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, VueElement } from "vue";
import bchaddr from "bchaddrjs-slp";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();

    //
    let searchWord = ref("");

    //
    let searchContainer = ref<null | VueElement>(null);

    //
    function search() {
      let address = searchWord.value;
      const isValidAddress = bchaddr.isValidAddress(address);

      //
      if (isValidAddress) {
        address = bchaddr.toSlpAddress(address);
        router.push("/address/" + address);
      } else {
        router.push("/tx/" + address);
      }
    }

    //
    return { search, searchWord, searchContainer };
  },
});
</script>

<style scoped>
input:focus,
button:focus {
  box-shadow: none !important;
}
</style>
