<template>
  <input
    type="text"
    :placeholder="$t('search_placeholder')"
    v-model="searchWord"
    @input="$emit('update:modelValue', searchWord)"
    @keypress="inputEvent"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

//
import useSearch from "@/use/useSearch";

//
export default defineComponent({
  name: "InputSearch",
  setup() {
    //
    const searchWord = ref("");

    //
    const { search } = useSearch();

    //
    function inputEvent(event: KeyboardEvent) {
      if (event.key === "Enter") {
        search(searchWord.value);
      }
    }

    //
    return { searchWord, inputEvent };
  },
});
</script>
