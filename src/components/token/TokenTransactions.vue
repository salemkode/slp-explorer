<template>
  <div class="token-transactions" v-if="tokenData.txs">
    <h3 class="table-title">
      {{ $t("transactions") }} ({{ status.transactionsNumber }})
    </h3>
    <ul class="nav nav-pills">
      <li
        v-for="(txs, key) in status.txs"
        v-show="txs.length"
        :key="key"
        :class="{ active: status.txsMode === key }"
        class="nav-item nav-link"
        @click="status.txsMode = key"
      >
        {{ key }}
      </li>
    </ul>
    <template v-for="(txs, key) in status.txs" :key="key">
      <pagination-table
        v-if="txs && txs.length"
        v-show="status.txsMode === key"
        :headers="status.headers"
        :items="txs"
      />
    </template>
  </div>
</template>

<script lang="ts">
// Modules
import { defineComponent, PropType, reactive, ref } from "vue";
import { numberWithCommas, getShortTxid } from "@/modules/utilities";

// Components
import PaginationTable from "@/components/global/table/PaginationTable.vue";

// Types
import {
  token_data,
  token_data__burn_tx,
  token_data__tx,
} from "@/types/fullstack.type";
import { table_row } from "@/types/table.type";

//
export default defineComponent({
  name: "TokenTransactions",
  // eslint-disable-next-line vue/no-unused-components
  components: { PaginationTable },
  props: {
    tokenData: {
      type: Object as PropType<token_data["tokenData"]>,
      required: true,
    },
    decimals: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    type txs_modes = "all" | "send" | "mint" | "burn";

    /*  */
    let status = reactive({
      headers: ["txid", "type", "amount", "block_height", "block_time"],
      start: 0,
      txs: {
        all: [] as table_row[],
        send: [] as table_row[],
        mint: [] as table_row[],
        burn: [] as table_row[],
      },
      txsMode: "all",
      transactionsNumber: "0",
    });

    //
    function getRealQty(qty: string | number): number {
      if (props.decimals === 0) return +qty;
      return +qty / props.decimals ** 10;
    }

    // Map txs to [txid, type, qty, height]
    function txsMap(tx: token_data__tx | token_data__burn_tx) {
      const txid = {
        text: getShortTxid(tx.txid),
        url: `/tx/${tx.txid}`,
        copy: true,
      };

      const row: table_row = ref([
        txid,
        tx.type,
        numberWithCommas(getRealQty(tx.qty)),
        tx.height,
        "time soon",
      ]);

      //
      if ("burned" in tx) {
        row.value[1] = "Burn";
        row.value[3] = numberWithCommas(getRealQty(tx.burned));
      }

      //
      return row;
    }

    //
    function txsFilter(mode: txs_modes) {
      return (tx: { type: string }) => {
        let type = tx.type;
        if (mode === "all") {
          return true;
        } else if (mode === "send") {
          return type === "SEND";
        } else if (mode === "mint") {
          return type === "GENESIS" || type === "MINT";
        } else if (mode === "burn") {
          return type === "BURN-UNCONTROLLED" || type === "SEND-BURN";
        }
      };
    }

    //
    if (Array.isArray(props.tokenData.txs)) {
      const reverseTxs = Array.from(props.tokenData.txs).reverse();

      // Add array
      Object.keys(status.txs).forEach((key) => {
        //
        let mode = key as txs_modes;

        //
        status.txs[mode] = Object.values(reverseTxs)
          .filter(txsFilter(mode))
          .map(txsMap);
      });
    }

    //
    status.transactionsNumber = numberWithCommas(status.txs.all.length);

    //
    return {
      status,
    };
  },
});
</script>
