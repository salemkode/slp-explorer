<template>
  <nav aria-label="Page navigation example" v-if="itemsLength > 1">
    <ul class="pagination">
      <li class="page-item" @click="changePage(1)">
        <a class="page-link"> First </a>
      </li>
      <li
        class="page-item"
        v-for="number in status.itemsPerPage"
        :key="number"
        :class="{ active: number + startPage === status.selectPage }"
      >
        <a class="page-link" @click="changePage(number + startPage)">
          {{ number + startPage }}
        </a>
      </li>
      <li class="page-item" @click="changePage(itemsLength)">
        <a class="page-link"> Last </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
//
import { computed, defineComponent, reactive } from "vue";

//
export default defineComponent({
  name: "PaginationNav",
  props: {
    itemsLength: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 7,
    },
    modelValue: {
      type: Number,
      default: 1,
    },
  },
  setup(props, context) {
    //
    const status = reactive({
      selectPage: props.modelValue,
      itemsPerPage:
        props.itemsPerPage > props.itemsLength
          ? props.itemsLength // ItemLength small than itemsPerPage
          : props.itemsPerPage,
    });

    //
    const startPage = computed(() => {
      //
      if (props.itemsPerPage > props.itemsLength) {
        return 0;
      }

      //
      if (props.itemsLength - 2 <= status.selectPage) {
        return props.itemsLength - props.itemsPerPage;
      }

      //
      if (status.selectPage - 4 > 0) {
        return status.selectPage - 4;
      }

      //
      return 0;
    });

    //
    function changePage(number: number) {
      status.selectPage = number;
      context.emit("update:modelValue", number);
    }

    return { status, startPage, changePage };
  },
});
</script>

<style scoped>
.pagination * {
  transition: all 1s;
}
</style>
