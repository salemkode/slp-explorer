<template>
  <div class="token-stats">
    <h3 class="table-title" v-text="$t('stats')" />
    <Table :items="stats" />
  </div>
</template>

<script lang="ts">
import { numberWithCommas } from "@/modules/utilities";
import { token_data } from "@/types/fullstack.type";
import { defineComponent, PropType, reactive } from "vue";

// Components
import Table from "@/components/global/table/Table.vue";

// Types
import { table_row } from "@/types/table.type";

// Use
import { useI18n } from "vue-i18n";

//
export default defineComponent({
  components: { Table },
  name: "TokenStats",
  props: {
    tokenData: {
      required: true,
      type: Object as PropType<token_data["tokenData"]>,
    },
  },
  setup(props) {
    //
    const { t } = useI18n();

    //
    const mintBatonStatus = props.tokenData.mintBatonIsActive
      ? "Alive"
      : "Dead Ended";

    //
    const stats = reactive<table_row[]>([
      [t("block_created"), props.tokenData.blockCreated],
      [t("minting_baton_status"), mintBatonStatus],
      [t("tokenstats_satoshis_locked_up"), "not found in slp indexer"],
      [t("minting_baton_utxo"), "not found in slp indexer"],
      [
        t("tokenstats_tokens_minted"),
        numberWithCommas(+props.tokenData.totalMinted),
      ],
      [
        t("tokenstats_tokens_burned"),
        numberWithCommas(+props.tokenData.totalBurned),
      ],
    ]);

    //
    return { stats };
  },
});
</script>
