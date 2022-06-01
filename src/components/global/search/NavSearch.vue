<template>
  <transition name="slider">
    <div v-if="!route.meta.removeNavBar" class="search-bar">
      <i class="fi fi-rr-search px-3" @click="searchMethod" />
      <input-search v-model="searchWord" />
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

// Use
import useSearch from "@/use/useSearch";

// Components
import InputSearch from "@/components/global/search/InputSearch.vue";
import { useRoute } from "vue-router";

//
export default defineComponent({
  name: "GroupSearch",
  components: { InputSearch },
  setup() {
    //
    const route = useRoute();

    //
    let { search } = useSearch();

    //
    const searchWord = ref("");

    //
    function searchMethod() {
      search(searchWord.value);
    }

    //
    return { searchWord, searchMethod, route };
  },
});
</script>

<style scoped>
input:focus,
button:focus {
  box-shadow: none !important;
}

.search-bar {
  display: flex;
  padding-left: 20px;
  background: var(--bs-dark);
  max-height: 200px;
}

.search-bar i {
  color: white;
  cursor: pointer;
}

.search-bar input {
  background: transparent;
  border: none;
  padding: 5px;
  width: 100%;
  color: white;
  outline: none;
}

.search-bar input::placeholder {
  color: white;
}

.slider-enter-active,
.slider-leave-active {
  transition: max-height 2s;
}

.slider-leave-from,
.slider-enter-to {
  max-height: 100px;
}

.slider-enter-from,
.slider-leave-to {
  max-height: 0;
}
</style>
