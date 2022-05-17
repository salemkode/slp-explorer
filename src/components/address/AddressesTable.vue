<template>
  <div class="token-stats">
    <Table :items="addresses" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import bchaddr from "bchaddrjs-slp";

// Components
import Table from "@/components/global/table/Table.vue";

// Types
import { table_row } from "@/types/table.type";

// Use
import { useI18n } from "vue-i18n";

//
export default defineComponent({
  name: "AddressesTable",
  components: { Table },
  props: {
    address: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    //
    const { t } = useI18n();

    //
    // Convert Address type
    const addresses = computed(() => [
      [
        t("slp_address"),
        { text: bchaddr.toSlpAddress(props.address), warp: true },
      ],
      [
        t("cash_address"),
        { text: bchaddr.toCashAddress(props.address), warp: true },
      ],
      [
        t("legacy_address"),
        { text: bchaddr.toLegacyAddress(props.address), warp: true },
      ],
    ]);

    //
    return { addresses };
  },
});
</script>
