<template>
  <div class="token-details">
    <h3 class="table-title" v-text="$t('details')" />
    <Table :items="details" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from "vue";

// Components
import Table from "@/components/global/table/Table.vue";

// Types
import { table_row } from "@/types/table.type";
import { token_data } from "@/types/backend.type";

// Use
import { useI18n } from "vue-i18n";

//
export default defineComponent({
  components: { Table },
  name: "TokenDetails",
  props: {
    tokenDetails: {
      required: true,
      type: Object as PropType<token_data["details"]>,
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
          text: props.tokenDetails.tokenId,
          copy: props.tokenDetails.tokenId,
          url: `/tx/${props.tokenDetails.tokenId}`,
          warp: true,
        },
      ],
      [t("version"), props.tokenDetails.type],
      [t("name"), props.tokenDetails.name],
      [t("symbol"), props.tokenDetails.ticker],
      [
        t("creator"),
        {
          text: props.tokenDetails.creator,
          url: "/address/" + props.tokenDetails.creator,
          copy: props.tokenDetails.creator,
        },
      ],
      [t("timestamp"), new Date(props.tokenDetails.time * 1000).toUTCString()],
      [t("decimals"), props.tokenDetails.decimals],
      [
        t("document_uri"),
        {
          text: props.tokenDetails.documentUri,
          copy: props.tokenDetails.documentUri,
          url: props.tokenDetails.documentUri,
        },
      ],
      [
        t("document_checksum"),
        {
          text: props.tokenDetails.documentHash,
          warp: true,
        },
      ],
    ];

    // Get parent of nft child
    const parentGroupId = toRef(props.tokenDetails, "parentGroupId");

    //
    if (parentGroupId.value) {
      details.push([
        t("nft1_group"),
        {
          text: parentGroupId.value,
          url: `/token/${parentGroupId.value}`,
          copy: parentGroupId.value,
        },
      ]);
    }

    return { details };
  },
});
</script>
