<template>
  <div
    class="align-items-center d-flex flex-column flex-md-row my-3 py-3"
    :class="{ 'flex-md-column': isNftIcon }"
  >
    <QrcodeVue v-if="address" :value="address" :size="128" />
    <InfoIcon
      v-else-if="tokenURL"
      :url="tokenURL"
      :size="isNftIcon ? 0 : 128"
      :tokenId="tokenId"
    />
    <div class="px-2 my-2 word-brack-all w-100">
      <h3 v-text="title" />
      <Copy :text="tokenId || address">
        <span v-text="tokenId || address" />
      </Copy>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { gatewayUrl, isIpfs } from "@/modules/ipfs";
import axios from "axios";

// Components
import Copy from "@/components/global/Copy.vue";
import QrcodeVue from "qrcode.vue";
import InfoIcon from "@/components/global/infoContainer/InfoIcon.vue";

//
export default defineComponent({
  name: "InfoContainer",
  components: { QrcodeVue, InfoIcon, Copy },
  props: {
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    tokenId: {
      type: String,
    },
    parentId: {
      type: String,
    },
    documentUri: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    // Token url
    const tokenURL = ref<string>();

    //
    const isNftIcon = computed<boolean>(
      () => !!(props.documentUri && isIpfs(props.documentUri))
    );

    //
    onMounted(async () => {
      if (isNftIcon.value) {
        //
        const metadata = await axios.get<{ image: string }>(
          gatewayUrl(props.documentUri)
        );

        //
        tokenURL.value = gatewayUrl(metadata.data.image);
      } else {
        tokenURL.value = `https://icons.fountainhead.cash/${128}/${
          props.tokenId
        }.png`;
      }
    });

    //
    function loadImage() {
      context.emit("load");
    }

    //
    return { loadImage, isNftIcon, tokenURL };
  },
});
</script>
