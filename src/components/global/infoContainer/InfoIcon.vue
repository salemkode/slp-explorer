<template>
  <div class="icon" :style="{ '--icon-size': size + 'px' }">
    <QrcodeVue v-if="address" :size="size" :value="address" />
    <div class="token-icon" v-else>
      <div v-if="status.loading" class="loading" role="status" />
      <img
        v-if="status.imgReady"
        v-show="!status.loading"
        :src="tokenUrl"
        :key="tokenUrl"
        @load="imageLoadDone"
        @error="imageLoadError"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from "vue";
import { toSvg } from "jdenticon";

// Components
import QrcodeVue from "qrcode.vue";
import { computed } from "@vue/reactivity";

//
export default defineComponent({
  name: "InfoIcon",
  props: {
    tokenId: String,
    parentId: String,
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
      loading: true,
      error: false,
      imgReady: false,
      iconRepo: "",
    });

    //
    onMounted(async () => {
      //
      if (props.parentId) {
        const nfts = await import("../../../../public/group_icon_repos.json");

        //
        const group_icon_repos = nfts.default as { [key: string]: string };

        //
        if (
          Object.prototype.hasOwnProperty.call(group_icon_repos, props.parentId)
        ) {
          status.iconRepo = group_icon_repos[props.parentId];
        }
      } else {
        status.iconRepo = "https://icons.fountainhead.cash";
      }

      status.imgReady = true;
    });

    //
    const tokenUrl = computed(() => {
      if (!status.error) {
        // Stop for loop error
        return `${status.iconRepo}/${props.size}/${props.tokenId}.png`;
      }

      // Change error state
      status.error = true;

      // Create svg icon for token
      let svgString = toSvg(props.tokenId, props.size);

      // Convert svg to base64
      return "data:image/svg+xml;base64," + btoa(svgString);
    });

    //
    function imageLoadError() {
      // Check from handling status
      if (status.error) {
        // Stop for loop error
        return;
      }

      // change value of first error
      status.error = true;
    }

    //
    function imageLoadDone() {
      status.loading = false;

      //
      context.emit("loading");
    }

    //
    return { imageLoadError, imageLoadDone, status, tokenUrl };
  },
});
</script>

<style scoped>
.icon > * {
  width: var(--icon-size);
  height: var(--icon-size);
}

.icon .loading {
  border-radius: 5px;
  background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 80%
    ),
    lightgray;
  background-repeat: repeat-y;
  background-size: 50px 500px;
  background-position: -50% 0;
  animation: shine 2s infinite linear alternate;
}

@keyframes shine {
  to {
    background-position: 150% 0;
  }
}
</style>
