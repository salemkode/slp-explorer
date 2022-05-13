import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./modules/i18n";

// Load loading component
import Loading from "./components/global/Loading.vue";

// Import css
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style.css";

// Create vue app
const app = createApp(App);

// Using i18n plugin
app.use(i18n);

// Support vuejs router
app.use(router);

//
app.component("Loading", Loading);

// Mount ower app
app.mount("#app");
