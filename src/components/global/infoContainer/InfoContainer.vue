<template>
  <div class="align-items-center d-flex flex-column flex-md-row my-3 py-3">
    <InfoIcon :address="address" :tokenId="tokenId" />
    <div class="px-2 word-brack-all w-100">
      <h3 v-text="title" />
      <Copy :text="tokenId || address">
        <span v-text="tokenId || address" />
      </Copy>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import Copy from "@/components/global/Copy.vue";
import InfoIcon from "@/components/global/infoContainer/InfoIcon.vue";

//
export default defineComponent({
  name: "InfoContainer",
  components: { InfoIcon, Copy },
  props: {
    title: {
      type: String,
      required: true,
    },
    tokenId: {
      type: String,
    },
    address: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    //
    function loadImage() {
      context.emit("load");
    }

    //
    return { loadImage };
  },
});
</script>
