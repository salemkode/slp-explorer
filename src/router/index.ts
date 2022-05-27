import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// Page
import Home from "../views/Home.vue";
import TokenPage from "../views/Token.vue";
import TxPage from "../views/Tx.vue";
import TxAddress from "../views/Address.vue";
import DonateUs from "../views/DonateUs.vue";

// Not found
import NotFoundPage from "../views/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home page",
    component: Home,
    meta: {
      removeNavBar: true,
    },
  },
  {
    path: "/token/:tokenid",
    name: "Token page",
    component: TokenPage,
  },
  {
    path: "/tx/:txid",
    name: "Transaction page",
    component: TxPage,
  },
  {
    path: "/address/:address",
    name: "Address page",
    component: TxAddress,
  },
  {
    path: "/donate-us",
    name: "Donate us page",
    component: DonateUs,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Page Not Found",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
});

export default router;
