<template>
  <div class="address-token-balances" v-if="txList.length">
    <h3 class="table-title">
      {{ $t("transactions") }}
      ({{ numberWithCommas(transaction.length) }})
    </h3>
    <pagination-table
      :headers="status.headers"
      :items="txList"
      :change="changePage"
      :pages="transaction.allPage"
    />
  </div>
</template>

<script lang="ts">
// Modules
import { defineComponent, reactive } from "vue";
import { numberWithCommas, getShortTxid } from "@/modules/utilities";

// Components
import PaginationTable from "@/components/global/table/PaginationTable.vue";

// Types
import { address_data, useAddressReturn } from "@/types/backend.type";
import { table_row } from "@/types/table.type";
import { PropType } from "vue";

//
export default defineComponent({
  name: "AddressTx",
  components: { PaginationTable },
  props: {
    transaction: {
      required: true,
      type: Object as PropType<address_data["transaction"]>,
    },
    getTransaction: {
      required: true,
      type: Function as PropType<useAddressReturn["getTransaction"]>,
    },
  },
  setup(props) {
    //
    let status = reactive({
      headers: ["block", "txid", "type", "amount", "token"],
      tokenNumber: "0",
    });

    //
    function mapTransaction(
      item: address_data["transaction"]["transactions"][0]
    ): table_row {
      //
      const row: table_row = [
        item.block,
        {
          text: getShortTxid(item.txid),
          url: `/tx/${item.txid}`,
          copy: item.txid,
        },
        item.type,
        item.qty,
        {
          text: item.tokenName,
          tokenIcon: item.tokenId,
          url: "/token/" + item.tokenId,
        },
      ];
      //
      return row;
    }

    //
    const txList: table_row[] =
      props.transaction.transactions.map(mapTransaction);

    //
    async function changePage(index: number) {
      try {
        const items: address_data["transaction"] = await props.getTransaction(
          index
        );

        //
        return items.transactions.map(mapTransaction);
      } catch (err) {
        console.error(index, err);
        return [];
      }
    }

    //
    return {
      status,
      txList,
      changePage,
      numberWithCommas,
    };
  },
});
</script>
