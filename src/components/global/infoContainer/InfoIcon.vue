<template>
  <div class="icon" :style="{ '--icon-size': size + 'px' }">
    <QrcodeVue v-if="address" :size="size" :value="address" />
    <img
      v-else
      :src="status.url"
      @load="imageLoadDone"
      @error="imageLoadError"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import { toSvg } from "jdenticon";

// Components
import QrcodeVue from "qrcode.vue";

//
export default defineComponent({
  name: "InfoIcon",
  props: {
    tokenId: String,
    address: {
      type: String,
      default: "",
    },
    size: {
      type: Number as PropType<128 | 64 | 32>,
      default: 128,
    },
  },
  components: { QrcodeVue },
  setup(props, context) {
    let status = reactive({
      firstError: true,
      url: `https://icons.fountainhead.cash/${props.size}/${props.tokenId}.png`,
    });

    function imageLoadError() {
      // Check from handling status
      if (!status.firstError) {
        // Stop for loop error
        return;
      }

      // change value of first error
      status.firstError = false;

      // Create svg icon for token
      let svgString = toSvg(props.tokenId, props.size);

      // Convert svg to base64
      status.url = "data:image/svg+xml;base64," + btoa(svgString);
    }

    function imageLoadDone() {
      context.emit("loading");
    }

    //
    return { imageLoadError, imageLoadDone, status };
  },
});
</script>

<style scoped>
.icon > * {
  width: var(--icon-size);
  height: var(--icon-size);
}
</style>
