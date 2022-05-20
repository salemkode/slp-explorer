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
import { useToken } from "@/use/useToken";

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
    const tokenList: table_row[] = unEmptyTokens.map((item) => {
      const { result } = useToken(item.tokenId, false);

      //
      const row = ref([
        {
          text: getShortTxid(item.tokenId),
          url: `/token/${item.tokenId}`,
          copy: true,
          tokenIcon: item.tokenId,
        },
        t("pending"),
        t("pending"),
        item.qty,
      ]);

      //
      watch(result, () => {
        if (result.value !== null) {
          row.value[1] = result.value.tokenData.name;
          row.value[2] = result.value.tokenData.ticker;
        }
      });

      //
      return row;
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
