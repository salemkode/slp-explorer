<template>
  <div class="token-transactions">
    <h3 class="table-title">
      {{ $t("transactions") }} ({{ numberWithCommas(tx.length) }})
    </h3>
    <pagination-table
      :headers="status.headers"
      :items="status.items"
      :pages="tx.allPage"
      :change="changePage"
    />
  </div>
</template>

<script lang="ts">
// Modules
import { defineComponent, PropType, reactive } from "vue";
import { numberWithCommas } from "@/modules/utilities";

// Components
import PaginationTable from "@/components/global/table/PaginationTable.vue";

// Types
import { table_row } from "@/types/table.type";
import { token_data, token_tx, useTokenReturn } from "@/types/backend.type";

//
export default defineComponent({
  name: "TokenTransactions",
  // eslint-disable-next-line vue/no-unused-components
  components: { PaginationTable },
  props: {
    tx: {
      type: Object as PropType<token_data["tx"]>,
      required: true,
    },
    getTx: {
      type: Function as PropType<useTokenReturn["getTx"]>,
      required: true,
    },
    decimals: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    /*  */
    let status = reactive({
      headers: ["txid", "type", "amount", "block_height", "block_time"],
      items: [] as table_row[],
    });

    // Map txs to [txid, type, qty, height]
    function mapTxs(tx: token_tx): table_row {
      //
      return [
        {
          text: tx.txid,
          copy: tx.txid,
          url: "/tx/" + tx.txid,
        },
        tx.type,
        tx.qty,
        tx.block,
        tx.time,
      ];
    }

    //
    status.items = props.tx.txs.map(mapTxs);

    //
    async function changePage(index: number) {
      try {
        const items: token_data["tx"] = await props.getTx(index);

        //
        return items.txs.map(mapTxs);
      } catch (err) {
        return [];
      }
    }

    //
    return {
      status,
      numberWithCommas,
      changePage,
    };
  },
});
</script>
