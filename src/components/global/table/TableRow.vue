<template>
  <tr>
    <table-cell v-for="(cell, key) in cells" :key="key" :item="cell" />
  </tr>
</template>

<script lang="ts">
import { ComputedRef, defineComponent } from "vue";

// Types
import { table_cell } from "@/types/table.type";
import { PropType } from "vue";

// Components
import TableCell from "@/components/global/table/TableCell.vue";

//
export default defineComponent({
  name: "TableRow",
  props: {
    cells: {
      type: Object as PropType<table_cell[] | ComputedRef<table_cell[]>>,
    },
  },
  components: { TableCell },
});
</script>
