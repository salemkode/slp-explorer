<template>
  <div class="token-details">
    <h3 class="table-title" v-text="$t('token-details')" />
    <Table :items="details" />
  </div>
</template>

<script lang="ts">
import { versionName } from "@/modules/utilities";
import { tx_data } from "@/types/fullstack.type";
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
  name: "TokenDetails",
  props: {
    txData: {
      required: true,
      type: Object as PropType<tx_data["txData"]>,
    },
  },
  setup(props) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const txData = props.txData;

    //
    const { t } = useI18n();

    //
    const details = reactive<table_row[]>([
      [
        t("token_id"),
        {
          text: txData.tokenId,
          copy: true,
          url: `/token/${txData.tokenId}`,
          warp: true,
        },
      ],
      [t("version"), versionName(+txData.tokenType)],
      [t("name"), txData.tokenName],
      [t("symbol"), txData.tokenTicker],
      [t("timestamp"), "soon"],
      [t("decimals"), txData.tokenDecimals],
      [
        t("document_uri"),
        {
          text: txData.tokenUri,
          copy: !!txData.tokenUri,
          url: txData.tokenUri,
        },
      ],
      [
        t("document_checksum"),
        {
          text: txData.tokenDocHash,
          warp: true,
        },
      ],
    ]);

    return { details };
  },
});
</script>
