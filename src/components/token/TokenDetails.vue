<template>
  <div class="token-details">
    <h3 class="table-title" v-text="$t('details')" />
    <Table :items="details" />
  </div>
</template>

<script lang="ts">
import { versionName } from "@/modules/utilities";
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
  name: "TokenDetails",
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
    const details = reactive<table_row[]>([
      [
        t("token_id"),
        {
          text: props.tokenData.tokenId,
          copy: true,
          url: `/tx/${props.tokenData.tokenId}`,
          warp: true,
        },
      ],
      [t("version"), versionName(+props.tokenData.type)],
      [t("name"), props.tokenData.name],
      [t("symbol"), props.tokenData.ticker],
      [t("creator"), "soon"],
      [t("timestamp"), "soon"],
      [t("decimals"), props.tokenData.decimals],
      [
        t("document_uri"),
        {
          text: props.tokenData.documentUri,
          copy: !!props.tokenData.documentUri,
          url:
            props.tokenData.documentUri !== "none"
              ? props.tokenData.documentUri
              : "",
        },
      ],
      [
        t("document_checksum"),
        {
          text: props.tokenData.documentHash,
          warp: true,
        },
      ],
    ]);

    return { details };
  },
});
</script>
