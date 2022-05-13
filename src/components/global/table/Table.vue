<template>
  <table class="table table-striped">
    <thead v-if="headers">
      <tr>
        <td v-for="(header, key) in headers" :key="key" v-text="$t(header)" />
      </tr>
    </thead>
    <tbody>
      <template v-if="Object.keys(items).length">
        <table-row v-for="(cells, key) in items" :key="key" :cells="cells" />
      </template>
      <tr v-else class="empty-table">
        <td v-text="emptyMessage" />
        <td />
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

// types
import { table_row } from "@/types/table.type";

// Components
import TableRow from "@/components/global/table/TableRow.vue";

//
export default defineComponent({
  components: { TableRow },
  name: "Table",
  props: {
    headers: Object as PropType<string[]>,
    items: {
      type: Object as PropType<table_row[]>,
      required: true,
    },
    "empty-message": {
      type: String,
      default: "No Items",
    },
  },
});
</script>
