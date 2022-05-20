<template>
  <div class="token-details">
    <h3 class="table-title" v-text="$t('details')" />
    <Table :items="details" />
  </div>
</template>

<script lang="ts">
import { versionName } from "@/modules/utilities";
import { token_data } from "@/types/fullstack.type";
import { defineComponent, PropType, toRefs } from "vue";

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
    const details: table_row[] = toRefs([
      [
        t("token_id"),
        {
          text: tokenData.tokenId,
          copy: true,
          url: `/tx/${tokenData.tokenId}`,
          warp: true,
        },
      ],
      [t("version"), versionName(+tokenData.type)],
      [t("name"), tokenData.name],
      [t("symbol"), tokenData.ticker],
      [t("creator"), "soon"],
      [t("timestamp"), "soon"],
      [t("decimals"), tokenData.decimals],
      [
        t("document_uri"),
        {
          text: tokenData.documentUri,
          copy: !!tokenData.documentUri,
          url: tokenData.documentUri !== "none" ? tokenData.documentUri : "",
        },
      ],
      [
        t("document_checksum"),
        {
          text: tokenData.documentHash,
          warp: true,
        },
      ],
    ]);

    return { details };
  },
});
</script>
