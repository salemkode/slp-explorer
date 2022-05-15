<template>
  <div class="tabel-container">
    <div class="table-warp">
      <table class="table table-striped">
        <thead v-if="headers">
          <tr>
            <td
              v-for="(header, key) in headers"
              :key="key"
              v-text="header ? $t(header) : ''"
            />
          </tr>
        </thead>
        <tbody>
          <table-row
            v-for="(cells, key) in currentPageItems"
            :key="key"
            :cells="cells"
          />
        </tbody>
      </table>
    </div>
    <pagination-nav :itemsLength="status.allPage" v-model="status.pagination" />
  </div>
</template>

<script lang="ts">
// Modules
import { computed, defineComponent, reactive } from "vue";
import { slice } from "@/modules/utilities";

// Types
import { PropType } from "vue";
import { table_row } from "@/types/table.type";

// Components
import PaginationNav from "@/components/global/PaginationNav.vue";
import TableRow from "@/components/global/table/TableRow.vue";

//
export default defineComponent({
  components: { PaginationNav, TableRow },
  name: "PaginationTable",
  props: {
    headers: {
      type: Object as PropType<string[]>,
    },
    items: {
      type: Object as PropType<table_row[]>,
      required: true,
    },
  },
  setup(props) {
    //
    const ITEMS_PER_PAGE = 7;

    //
    let status = reactive({
      pagination: 1,
      allPage: Math.ceil(props.items.length / ITEMS_PER_PAGE),
    });

    //
    const currentPageItems = computed(() => {
      //
      const start = (status.pagination - 1) * ITEMS_PER_PAGE;

      //
      const items = slice(props.items, start, ITEMS_PER_PAGE) as table_row[];

      // Fill empty item
      // Make Items length is ITEMS_PER_PAGE
      for (let i = 0; i < ITEMS_PER_PAGE; i++) {
        if (!items[i]) {
          let firstCell = props.items[0];

          //
          let emptyItem = new Array(firstCell.length).fill("");

          //
          items[i] = emptyItem;
        }
      }

      //
      return items;
    });

    //
    return {
      status,
      currentPageItems,
    };
  },
});
</script>

<style scoped>
.table-warp {
  overflow-x: auto;
}

.table thead td {
  white-space: nowrap;
}
</style>
