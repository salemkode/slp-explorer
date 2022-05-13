<template>
  <div class="tables-container">
    <div class="tx-inputs">
      <h3 class="table-title" v-text="$t('inputs')" />
      <Table
        :headers="headers"
        :items="inputs"
        :empty-message="$t('no_inputs')"
      />
    </div>
    <div class="tx-outputs">
      <h3 class="table-title" v-text="$t('outputs')" />
      <Table :headers="headers" :items="outputs" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { numberWithCommas } from "@/modules/utilities";
import bchaddr from "bchaddrjs-slp";

// Components
import Table from "@/components/global/table/Table.vue";

// Use
import { useI18n } from "vue-i18n";

// Types
import { PropType } from "vue";
import { table_cell } from "@/types/table.type";
import { tx_data } from "@/types/fullstack.type";

//
export default defineComponent({
  name: "TokenInput",
  components: { Table },
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
    const headers = ["amount", "address"];

    //
    const inputs = reactive<table_cell[][]>([]);
    const outputs = reactive<table_cell[][]>([]);

    //
    function createSlpAddressCell(address: string) {
      const slpAddress = bchaddr.toSlpAddress(address);

      return {
        text: slpAddress,
        url: "/token/" + slpAddress,
      };
    }

    //
    txData.vin.forEach((item) => {
      if (item.tokenQty) {
        const adderssCell = createSlpAddressCell(item.address);

        inputs.push([numberWithCommas(item.tokenQty), adderssCell]);
      }
    });

    //
    txData.vout.forEach((item) => {
      const addresses = item.scriptPubKey.addresses;
      if (addresses) {
        const adderssCell = createSlpAddressCell(addresses[0]);

        //
        if (item.tokenQty) {
          outputs.push([numberWithCommas(item.tokenQty), adderssCell]);
        } else if (item.isMintBaton) {
          outputs.push([t("mint_baton"), adderssCell]);
        }
      }
    });

    return { inputs, outputs, headers };
  },
});
</script>
