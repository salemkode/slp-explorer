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
import { defineComponent, ref, watch } from "vue";

//
import useSearch from "@/use/useSearch";

//
export default defineComponent({
  name: "InputSearch",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    //
    const searchWord = ref("");

    //
    watch(props, () => (searchWord.value = props.modelValue));

    //
    const { search } = useSearch();

    //
    function inputEvent(event: KeyboardEvent) {
      if (event.key === "Enter") {
        search(searchWord.value);
        searchWord.value = "";
      }
    }

    //
    return { searchWord, inputEvent };
  },
});
</script>
