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
    //
    const { t } = useI18n();

    //
    const details = reactive<table_row[]>([
      [
        t("token_id"),
        {
          text: props.txData.tokenId,
          copy: true,
          url: `/token/${props.txData.tokenId}`,
          warp: true,
        },
      ],
      [t("version"), versionName(+props.txData.tokenType)],
      [t("name"), props.txData.tokenName],
      [t("symbol"), props.txData.tokenTicker],
      [t("timestamp"), "soon"],
      [t("decimals"), props.txData.tokenDecimals],
      [
        t("document_uri"),
        {
          text: props.txData.tokenUri,
          copy: !!props.txData.tokenUri,
          url: props.txData.tokenUri,
        },
      ],
      [
        t("document_checksum"),
        {
          text: props.txData.tokenDocHash,
          warp: true,
        },
      ],
    ]);

    return { details };
  },
});
</script>
