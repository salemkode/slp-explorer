<template>
  <div class="icon my-1" :style="`--icon-size: ${iconSize}`">
    <div v-if="status.loading" class="loading" role="status" />
    <img
      v-show="!status.loading"
      :src="status.imageUrl"
      :key="status.imageUrl"
      @load="imageLoadDone"
      @error="imageLoadError"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { toSvg } from "jdenticon";

// Types
import { PropType } from "vue";

//
export default defineComponent({
  name: "InfoIcon",
  props: {
    tokenId: {},
    url: {
      type: String,
      default: "",
    },
    size: {
      type: Number as PropType<128 | 64 | 32 | 0>,
      default: 128,
    },
  },
  setup(props, context) {
    let status = reactive({
      loading: true,
      error: false,
      iconSize: "",
      imageUrl: props.url,
    });

    /*
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
*/
    //
    function imageLoadError() {
      // Check from handling status
      if (status.error) {
        // Stop for loop error
        return;
      }

      // Change error state
      status.error = true;

      // Create svg icon for token
      let svgString = toSvg(props.tokenId, props.size);

      // Convert svg to base64
      status.imageUrl = "data:image/svg+xml;base64," + btoa(svgString);
    }

    //
    function imageLoadDone() {
      status.loading = false;

      //
      context.emit("loading");
    }

    //
    const iconSize = computed(() =>
      props.size === 0 ? "80%" : `${props.size}px`
    );

    //
    return { imageLoadError, imageLoadDone, iconSize, status };
  },
});
</script>

<style scoped>
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon > * {
  max-width: var(--icon-size);
  max-height: var(--icon-size);
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
