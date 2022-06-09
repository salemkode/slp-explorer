<template>
  <div class="token-transactions">
    <h3 class="table-title">
      {{ $t("child_nfts") }} ({{ numberWithCommas(nft.length) }})
    </h3>
    <pagination-table
      :headers="status.headers"
      :items="status.items"
      :pages="nft.allPage"
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
import { token_data, useTokenReturn } from "@/types/backend.type";

//
export default defineComponent({
  name: "TokenNfts",
  // eslint-disable-next-line vue/no-unused-components
  components: { PaginationTable },
  props: {
    nft: {
      type: Object as PropType<token_data["nft"]>,
      required: true,
    },
    getNft: {
      type: Function as PropType<useTokenReturn["getNft"]>,
      required: true,
    },
  },
  setup(props) {
    /*  */
    let status = reactive({
      headers: ["txid"],
      items: [] as table_row[],
    });

    // Map txs to [txid, type, qty, height]
    function mapNfts(nft: string): table_row {
      //
      return [
        {
          text: nft,
          copy: nft,
          url: "/token/" + nft,
        },
      ];
    }

    //
    status.items = props.nft.nfts.map(mapNfts);

    //
    async function changePage(index: number) {
      try {
        const items: token_data["nft"] = await props.getNft(index);

        //
        return items.nfts.map(mapNfts);
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
