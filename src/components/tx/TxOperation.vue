<template>
  <div class="tables-container">
    <div class="tx-inputs">
      <h3 class="table-title" v-text="$t('inputs')" />
      <Table
        :headers="headers"
        :items="status.inputs"
        :empty-message="$t('no_inputs')"
      />
    </div>
    <div class="tx-outputs">
      <h3 class="table-title" v-text="$t('outputs')" />
      <Table :headers="headers" :items="status.outputs" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { numberWithCommas } from "@/modules/utilities";

// Components
import Table from "@/components/global/table/Table.vue";

// Use
import { useI18n } from "vue-i18n";

// Types
import { PropType } from "vue";
import { table_row } from "@/types/table.type";
import { tx_data } from "@/types/backend.type";

//
export default defineComponent({
  name: "TokenInput",
  components: { Table },
  props: {
    inputs: {
      required: true,
      type: Object as PropType<tx_data["inputs"]>,
    },
    outputs: {
      required: true,
      type: Object as PropType<tx_data["outputs"]>,
    },
  },
  setup(props) {
    //
    const { t } = useI18n();

    //
    const headers = ["amount", "address"];

    //
    const status = reactive({
      inputs: [] as table_row[],
      outputs: [] as table_row[],
    });

    //
    function createSlpAddressCell(address: string) {
      return {
        text: address,
        url: "/address/" + address,
        warp: true,
      };
    }

    //
    props.inputs.forEach((item) => {
      if (item.qty) {
        const adderssCell = createSlpAddressCell(item.address);

        status.inputs.push([numberWithCommas(+item.qty), adderssCell]);
      }
    });

    //
    props.outputs.forEach((item) => {
      const adderssCell = createSlpAddressCell(item.address);

      //
      if (item.mint_baton) {
        status.outputs.push([t("mint_baton"), adderssCell]);
      } else {
        status.outputs.push([numberWithCommas(+item.qty), adderssCell]);
      }
    });

    return { status, headers };
  },
});
</script>
