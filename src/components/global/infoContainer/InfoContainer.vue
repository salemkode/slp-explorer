<template>
  <div
    class="align-items-center d-flex flex-column my-3 py-3"
    :class="{ 'flex-md-row': tokenState.imageSize === 128 }"
  >
    <QrcodeVue v-if="address" :value="address" :size="tokenState.imageSize" />
    <InfoIcon
      v-else-if="token && tokenState.imageURL"
      :tokenId="token.tokenId"
      :url="tokenState.imageURL"
      :size="tokenState.imageSize"
    />
    <div class="px-2 my-2 word-brack-all w-100">
      <h3 v-text="title" />
      <Copy :text="subTitle">
        <span v-text="subTitle" />
      </Copy>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive, watchEffect } from "vue";
import { gatewayUrl, isIpfs } from "@/modules/ipfs";
import axios from "axios";

// Components
import Copy from "@/components/global/Copy.vue";
import QrcodeVue from "qrcode.vue";
import InfoIcon from "@/components/global/infoContainer/InfoIcon.vue";

// Types
import { token_data } from "@/types/backend.type";
import { computed } from "@vue/reactivity";
type tokenPropType = {
  tokenId: string;
  type: token_data["details"]["type"];
  documentUri: string;
  parentGroupId?: string;
};

//
const props = defineProps<{
  title: string;
  address?: string;
  token?: tokenPropType;
}>();

// sub title of token id or slp address
const subTitle = computed(() => props.address || props.token?.tokenId);

// Token url
const tokenState = reactive({
  isIPFS: false,
  imageURL: "",
  imageSize: 0 as 128 | 0,
});

// Function for set token image base of type
function getTokenImageSize(tokenType: tokenPropType["type"]): 0 | 128 {
  if (tokenType === "nft1_child" && tokenState.isIPFS) {
    // Make Image full size for nft
    return 0;
  } else {
    // Make icon small
    return 128;
  }
}

// Function for get url of token image from ipfs
async function getIpfsImage(documentUri: string): Promise<string> {
  const metadata = await axios.get<{ image: string }>(gatewayUrl(documentUri));

  //
  return gatewayUrl(metadata.data.image);
}

// Function for get url of token image from group_icon_repos.json
async function getBaseUrlForImage(parentGroupId: string): Promise<string> {
  const nfts = await import("../../../../public/group_icon_repos.json");

  //
  const group_icon_repos = nfts.default as {
    [key: string]: string;
  };

  //
  if (group_icon_repos[parentGroupId]) {
    return group_icon_repos[parentGroupId];
  } else {
    return "";
  }
}

//
watchEffect(async () => {
  if (props.token) {
    //
    tokenState.isIPFS = isIpfs(props.token.documentUri);

    // Set size of token icon
    tokenState.imageSize = getTokenImageSize(props.token.type);

    if (tokenState.isIPFS) {
      // Get Url of nft Image
      tokenState.imageURL = await getIpfsImage(props.token.documentUri);
    } else {
      let baseURl = "https://icons.fountainhead.cash/";

      //
      if (props.token.type === "nft1_child" && props.token.parentGroupId) {
        const nftBaseUrl = await getBaseUrlForImage(props.token.parentGroupId);

        //
        if (nftBaseUrl) {
          baseURl = nftBaseUrl;
        }
      }

      //
      tokenState.imageURL = `${baseURl}/${128}/${props.token.tokenId}.png`;
    }
  }
});
</script>
