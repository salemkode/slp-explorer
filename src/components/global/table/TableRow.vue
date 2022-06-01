<template>
  <tr>
    <table-cell v-for="(cell, key) in cells" :key="key" :item="cell" />
  </tr>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Types
import { table_row } from "@/types/table.type";
import { PropType } from "vue";

// Components
import TableCell from "@/components/global/table/TableCell.vue";

//
export default defineComponent({
  name: "TableRow",
  props: {
    cells: {
      type: Object as PropType<table_row>,
      required: true,
    },
  },
  components: {
    TableCell,
  },
});
</script>
