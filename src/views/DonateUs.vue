<template>
  <div class="container">
    <h2 class="my-5">Help us complete the development of slp explorer</h2>
    <div class="card-body">
      <div class="border d-lg-flex justify-content-center p-4">
        <div class="card border-0 qr-container" @click="copyAddress">
          <QrcodeVue :size="200" :value="status.address" />
          <span class="small" v-text="status.copyLabel" />
        </div>
        <span class="space" />
        <div class="card border-0 my-auto">
          <Copy :text="status.address">
            <span class="h5" v-text="status.address" />
          </Copy>
          <button class="btn btn-success mt-4 w-100" @click="openWallet">
            Open Bitcoin Cash Wallet
          </button>
        </div>
      </div>

      <div class="analytics py-4 d-flex flex-column flex-md-row">
        <div class="card">
          <i class="fi fi-rr-home h1" />
          <h3>
            balance:
            {{ status.balance ? `${status.balance} BCH` : $t("pending") }}
          </h3>
        </div>
        <span class="space" />
        <div class="card">
          <i class="fi fi-rr-target h1" />
          <h3>Target: 10 BCH</h3>
        </div>
      </div>
      <div class="status-campagin my-4 d-flex">
        <div class="progress">
          <div
            class="progress-bar bg-success"
            role="progressbar"
            :style="{ width: +status.balance * 10 + '%' }"
          />
        </div>
      </div>
    </div>
    <div class="details m-3">
      <article>
        <p class="py-3 h5">
          This donation will contribute to completing the basic features and
          displaying all data on the token and address page
        </p>
      </article>
      <article>
        <h3>Why donate to the project ?</h3>
        <p class="py-3 h5">
          This contributes to the completion and improvement of the slp explorer
          build
        </p>
      </article>
      <article>
        <h3>Are there costs to keeping the project running ?</h3>
        <p class="py-3 h5">
          We are currently building the explorer backend and that needs vps to
          run
        </p>
      </article>
      <article>
        <h3>Is the project open source ?</h3>
        <p class="py-3 h5">
          Yes you can see in
          <a href="https://github.com/salemkode/slp-explorer">source code</a>
        </p>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

// modules
import bchaddr from "bchaddrjs-slp";
import { getAddressTotalReceived } from "@/modules/actorforth";

// Use
import { useClipboard } from "@/use/useClipboard";

// Components
import QrcodeVue from "qrcode.vue";
import Copy from "@/components/global/Copy.vue";

//
export default defineComponent({
  name: "DonateButton",
  components: {
    QrcodeVue,
    Copy,
  },
  setup() {
    //
    const status = reactive({
      address: "bitcoincash:qzwep8gr0pundplwfkmjsc4nh6208deasuj9mdaljl",
      copyLabel: "Click to copy" as "Click to copy" | "Address copied!",
      balance: 0,
    });

    //
    async function updateAddressBalance() {
      const totalReceived = await getAddressTotalReceived(status.address);

      // Update data im status
      status.balance = +totalReceived;
    }

    //
    updateAddressBalance();

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
    return { status, openWallet, copyAddress };
  },
});
</script>

<style scoped>
/* Article */
article {
  padding-top: 25px;
}

article h3 {
  font-weight: 600;
  padding-bottom: 0.3em;
  font-size: 1.5em;
  border-bottom: 1px solid hsla(210, 18%, 87%, 1);
}

/*  */
.progress {
  flex-grow: 1;
}

.space {
  width: 25px;
  height: 25px;
}

/* Click transition */
.qr-container {
  transition: 0.5s transform;
}

.qr-container:active {
  transform: scale(0.95);
}

/*  */
.analytics .card {
  flex-direction: column;
  align-items: center;
  padding: 10px;
  width: 100%;
  border: none;
}

.analytics .card header {
  margin-bottom: 5px;
}

/* LG */
@media (max-width: 992px) {
  .qr-container {
    width: max-content;
    margin: auto;
  }
}
</style>
