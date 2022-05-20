<template>
  <div class="address-token-balances" v-if="txList.length">
    <h3 class="table-title">
      {{ $t("transactions") }}
      ({{ numberWithCommas(txList.length) }})
    </h3>
    <pagination-table :headers="status.headers" :items="txList" />
  </div>
</template>

<script lang="ts">
// Modules
import { defineComponent, reactive, ref, watch } from "vue";
import { numberWithCommas, getShortTxid } from "@/modules/utilities";

// Components
import PaginationTable from "@/components/global/table/PaginationTable.vue";

// Types
import { address_data } from "@/types/fullstack.type";
import { table_row } from "@/types/table.type";
import { PropType } from "vue";

// Use
import { useI18n } from "vue-i18n";
import { useTx } from "@/use/useTx";

//
export default defineComponent({
  name: "AddressTx",
  components: { PaginationTable },
  props: {
    txs: {
      required: true,
      type: Object as PropType<address_data["balance"]["txs"]>,
    },
  },
  setup(props) {
    //
    const { t } = useI18n();

    //
    let status = reactive({
      headers: ["block", "txid", "type", "amount", "token"],
      tokenNumber: "0",
    });

    // TODO: Get more data for tx
    const txList: table_row[] = props.txs.map((item) => {
      const { result } = useTx(item.txid);

      const row: table_row = ref([
        item.height,
        {
          text: getShortTxid(item.txid),
          url: `/tx/${item.txid}`,
          copy: true,
        },
        t("pending"), // Type of Transactions
        t("pending"), // Amount of Transactions
        t("pending"), // Token of Transactions
      ]);

      watch(result, () => {
        if (result.value) {
          row.value[2] = result.value.txData.tokenTxType;
          row.value[3] = "soon";
          row.value[4] = {
            text: result.value.txData.tokenName,
            tokenIcon: result.value.txData.tokenId,
            url: "/token/" + result.value.txData.tokenId,
          };
        }
      });

      return row;
    });

    //
    return {
      status,
      numberWithCommas,
      txList,
    };
  },
});
</script>
