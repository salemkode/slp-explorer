<template>
  <footer>
    <div class="d-md-flex container mx-auto py-4 footer-items">
      <div class="col">
        <h4 v-text="$t('footer_source_code')" />
        <ul>
          <li
            v-for="sourceCodeItem in sourceCodeList"
            :key="sourceCodeItem.title"
          >
            <a :href="sourceCodeItem.url" v-text="sourceCodeItem.title" />
          </li>
        </ul>
      </div>
      <div class="col">
        <h4 data-i18n="footer_resources">Resources</h4>
        <ul>
          <li v-for="resource in resources" :key="resource.title">
            <a :href="resource.url" v-text="resource.title" />
          </li>
        </ul>
      </div>
      <div class="col">
        <h4 v-text="$t('footer_connect')"></h4>
        <ul>
          <li v-for="connectItem in connectList" :key="connectItem.title">
            <a :href="connectItem.url" v-text="connectItem.title" />
          </li>
        </ul>
      </div>
    </div>

    <!-- Copy right -->
    <div class="copy-right bg-dark text-white p-3">
      <div class="container d-flex justify-content-between">
        <p class="mb-0">
          SLP Explorer © {{ new Date().getFullYear() }}
          <span class="mx-1">|</span> Made with
          <a class="mr-2" href="https://salemkode.com/">SalemKode</a>
        </p>
        <p>Funded by Bitcoin Cash Community</p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const sourceCodeList = [
      {
        title: "SLP Explorer",
        url: "https://github.com/salemkode/slp-explorer",
      },
      {
        title: "SLP Explorer backend",
        url: "https://github.com/salemkode/slp-explorer-backend",
      },
      {
        title: "SLP indexer",
        url: "https://github.com/Permissionless-Software-Foundation/psf-slp-indexer",
      },
    ];

    const resources = [
      {
        title: "simpleledger.cash",
        url: "https://simpleledger.cash/",
      },
      {
        title: "specification",
        url: "https://github.com/simpleledger/slp-specifications",
      },
      {
        title: "slp-sdk",
        url: "https://developer.bitcoin.com/slp/",
      },
    ];

    const connectList = [
      {
        title: "Explorer developer",
        url: "https://t.me/salemkode",
      },
      {
        title: "SimpleLedger Chat",
        url: "https://t.me/simpleledger",
      },
      {
        title: "SimpleLedger Youtube",
        url: "https://www.youtube.com/channel/UC_WJO3lyHAhdU6oEk0lhMLw",
      },
      {
        title: "SimpleLedger Twitter",
        url: "https://twitter.com/SimpleLedger",
      },
      {
        title: "Fountainhead Chat",
        url: "http://t.me/fountainheadcash",
      },
    ];

    return {
      sourceCodeList,
      resources,
      connectList,
    };
  },
});
</script>

<style scoped>
.footer-items > * {
  margin-top: 20px;
}

.slp-logo {
  display: flex;
  align-items: center;
}

.slp-logo img {
  width: 80px;
}

a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
  padding: 10px 0 0 0;
}

ul li {
  margin-top: 5px;
}

ul li a:hover {
  color: var(--bs-gray);
}
</style>
