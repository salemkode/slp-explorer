<template>
  <div class="address-token-balances" v-if="tokenList.length">
    <h3 class="table-title">
      {{ $t("address_page_token_balances") }}
      ({{ numberWithCommas(tokenList.length) }})
    </h3>
    <pagination-table :headers="status.headers" :items="tokenList" />
  </div>
</template>

<script lang="ts">
// Modules
import { defineComponent, reactive } from "vue";
import { numberWithCommas, getShortTxid } from "@/modules/utilities";

// Components
import PaginationTable from "@/components/global/table/PaginationTable.vue";

// Types
import { address_data } from "@/types/fullstack.type";
import { PropType } from "vue";

// Use
import { useI18n } from "vue-i18n";

//
export default defineComponent({
  name: "TokenBalances",
  components: { PaginationTable },
  props: {
    address: {
      required: true,
      type: Object as PropType<address_data["balance"]>,
    },
  },
  setup(props) {
    const { t } = useI18n();
    //
    let status = reactive({
      headers: ["token_id", "name", "symbol", "balance"],
      tokenNumber: "0",
    });

    //
    const unEmptyTokens = props.address.balances.filter((item) => {
      return +item.qty; // Must be more than 0
    });

    //
    const tokenList = unEmptyTokens.map((item) => {
      //
      const txCell = {
        text: getShortTxid(item.tokenId),
        url: `/token/${item.tokenId}`,
        copy: true,
        tokenIcon: true,
      };

      //
      return [txCell, t("pending"), t("pending"), item.qty];

      //
      /*
      * Computed in table not work now
      const { result } = useToken(item.tokenId, false);
      return computed(() => {
        if (result.value) {
          return [
            txCell,
            result.value.tokenData.name,
            result.value.tokenData.ticker,
            item.qty,
          ];
        }

        return [txCell, t("pending"), t("pending"), item.qty];
      });
      */
    });

    //
    return {
      status,
      numberWithCommas,
      tokenList,
    };
  },
});
</script>
