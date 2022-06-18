<template>
  <div class="token-details">
    <h3 class="table-title" v-text="$t('token-details')" />
    <Table :items="details" />
  </div>
</template>

<script lang="ts">
import { tx_data } from "@/types/backend.type";
import { defineComponent, PropType } from "vue";

// Components
import Table from "@/components/global/table/Table.vue";

// Types
import { table_row } from "@/types/table.type";

// Use
import { useI18n } from "vue-i18n";

//
export default defineComponent({
  components: { Table },
  name: "TxToken",
  props: {
    token: {
      required: true,
      type: Object as PropType<tx_data["token"]>,
    },
  },
  setup(props) {
    //
    const { t } = useI18n();

    //
    const details: table_row[] = [
      [
        t("token_id"),
        {
          text: props.token.tokenId,
          copy: props.token.tokenId,
          url: `/token/${props.token.tokenId}`,
          warp: true,
        },
      ],
      [t("version"), props.token.type],
      [t("name"), props.token.name],
      [t("symbol"), props.token.ticker],
      [t("decimals"), props.token.decimals],
      [
        t("document_uri"),
        {
          text: props.token.documentUri,
          copy: props.token.documentUri,
          url: props.token.documentUri,
        },
      ],
      [
        t("document_checksum"),
        {
          text: props.token.documentHash,
          warp: true,
        },
      ],
    ];

    return { details };
  },
});
</script>
