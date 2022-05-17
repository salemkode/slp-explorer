<template>
  <div class="search-container">
    <div class="container-feild input-group">
      <input-search v-model="searchWord" class="form-control" />
      <button class="btn btn-outline-secondary" @click="searchMethod">
        <i class="fi fi-rr-search"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useSearch from "@/use/useSearch";

// Components
import InputSearch from "@/components/global/search/InputSearch.vue";

//
export default defineComponent({
  name: "GroupSearch",
  components: { InputSearch },
  setup() {
    //
    let { search } = useSearch();

    //
    const searchWord = ref("");

    //
    function searchMethod() {
      search(searchWord.value);

      // Empty the search field
      searchWord.value = "";
    }

    //
    return { searchWord, searchMethod };
  },
});
</script>

<style scoped>
input:focus,
button:focus {
  box-shadow: none !important;
}
</style>
