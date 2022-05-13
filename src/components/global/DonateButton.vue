<template>
  <div class="Donate">
    <button
      @click="toggleShowPopup"
      class="btn btn-success"
      v-text="$t('mainmenu_donate_us')"
    />
    <transition-group name="fade">
      <div class="modal" @click.self="toggleShowPopup" v-if="status.showPopup">
        <div class="card">
          <header class="card-header">Send any amount of BCH</header>
          <div class="card-body">
            <div class="card qr-container p-3 m-3" @click="copyAddress">
              <QrcodeVue :size="200" :value="status.address" />
              <span class="small" v-text="status.copyLabel" />
            </div>
            <div class="balance">balance: {{ status.balance }} BCH</div>
            <button class="btn btn-success mt-4 w-100" @click="openWallet">
              Open Wallet
            </button>
          </div>
        </div>
      </div>
      <div class="modal-backdrop show" v-if="status.showPopup"></div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

// modules
import bchaddr from "bchaddrjs-slp";
import { getAddressBalance } from "@/modules/fullstack";

// Use
import { useClipboard } from "@/use/useClipboard";
import { useI18n } from "vue-i18n";

// Components
import QrcodeVue from "qrcode.vue";

//
export default defineComponent({
  name: "DonateButton",
  components: {
    QrcodeVue,
  },
  setup() {
    //
    const { t } = useI18n();

    //
    const status = reactive({
      showPopup: false,
      address: "bitcoincash:qzwep8gr0pundplwfkmjsc4nh6208deasuj9mdaljl",
      copyLabel: "Click to copy" as "Click to copy" | "Address copied!",
      balance: t("pending") as string | number,
    });

    //
    getAddressBalance(status.address).then((balance) => {
      // convert from sat to bch
      status.balance = balance / 100000000;
    });

    //
    function toggleShowPopup() {
      status.showPopup = !status.showPopup;
    }

    //
    const { copy } = useClipboard();

    //
    function copyAddress() {
      copy(status.address);
      status.copyLabel = "Address copied!";

      setTimeout(() => {
        status.copyLabel = "Click to copy";
      }, 2000);
    }

    //
    function openWallet() {
      window.open(bchaddr.toCashAddress(status.address));
    }

    //
    return { status, openWallet, toggleShowPopup, copyAddress };
  },
});
</script>

<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Click transition */
.qr-container {
  transition: 0.5s transform;
}

.qr-container:active {
  transform: scale(0.95);
}
</style>
