<template>
  <div class="address-token-balances" v-if="tokenList.length">
    <h3 class="table-title">
      {{ $t("address_page_token_balances") }}
      ({{ numberWithCommas(balance.length) }})
    </h3>
    <pagination-table
      :headers="status.headers"
      :items="tokenList"
      :pages="balance.allPage"
      :change="changePage"
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
  name: "TokenBalances",
  components: { PaginationTable },
  props: {
    balance: {
      required: true,
      type: Object as PropType<address_data["balance"]>,
    },
    getBalance: {
      type: Function as PropType<useAddressReturn["getBalance"]>,
      required: true,
    },
  },
  setup(props) {
    //
    let status = reactive({
      headers: ["token_id", "name", "symbol", "balance"],
      tokenNumber: "0",
    });

    //
    function mapBalance(item: address_data["balance"]["balances"][0]) {
      //
      const row = [
        {
          text: getShortTxid(item.tokenId),
          url: `/token/${item.tokenId}`,
          copy: item.tokenId,
          tokenIcon: item.tokenId,
        },
        item.name,
        item.ticker,
        item.qty,
      ];

      //
      return row;
    }

    //
    const tokenList: table_row[] = props.balance.balances.map(mapBalance);

    //
    async function changePage(index: number) {
      try {
        const items: address_data["balance"] = await props.getBalance(index);

        //
        return items.balances.map(mapBalance);
      } catch (err) {
        return [];
      }
    }

    //
    return {
      status,
      tokenList,
      numberWithCommas,
      changePage,
    };
  },
});
</script>
