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
    // eslint-disable-next-line vue/no-setup-props-destructure
    const tokenData = props.tokenData;

    //
    const { t } = useI18n();

    //
    const mintBatonStatus = tokenData.mintBatonIsActive
      ? "Alive"
      : "Dead Ended";

    //
    const stats = reactive([
      [t("block_created"), tokenData.blockCreated],
      [t("minting_baton_status"), mintBatonStatus],
      [t("tokenstats_satoshis_locked_up"), "not found in slp indexer"],
      [t("minting_baton_utxo"), "not found in slp indexer"],
      [t("tokenstats_tokens_minted"), numberWithCommas(+tokenData.totalMinted)],
      [t("tokenstats_tokens_burned"), numberWithCommas(+tokenData.totalBurned)],
    ]);

    //
    return { stats };
  },
});
</script>
