import Vue from "vue";
import Router from "vue-router";
import HomePage from "./views/HomePage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },
  routes: [
    {
      path: "/",
      component: HomePage,
      children: [
        {
          path: "",
          name: "home",
          component: () => import("./components/ConnectedBeacons.vue"),
          meta: { hideSmallLogo: true },
        },
        {
          path: "results",
          name: "searchresults",
          props: true,
          component: () => import("./components/BeaconResults.vue"),
          meta: { hideSmallLogo: false },
        },
      ],
    },
    {
      path: "/join",
      name: "join",
      component: () => import("./views/JoinPage.vue"),
    },
    {
      path: "/docs",
      name: "docs",
      component: () => import("./views/DocsPage.vue"),
    },
    {
      path: "/docsapi",
      name: "docsapi",
      component: () => import("./views/DocsApiPage.vue"),
    },
    {
      path: "/tos",
      name: "tos",
      component: () => import("./views/TosPage.vue"),
    },
    {
      path: "/privacy",
      name: "privacy",
      component: () => import("./views/PrivacyPage.vue"),
    },
    {
      path: "/guide",
      name: "guide",
      component: () => import("./views/GuidePage.vue"),
    },
    {
      path: "/accessibility",
      name: "accessibility",
      component: () => import("./views/AccessibilityPage.vue"),
    },
    {
      path: "/datasets",
      name: "datasets",
      component: () => import("./views/beaconDatasetsPage.vue"),
    },
    {
      path: "/history",
      name: "history",
      component: () => import("./views/HistoryPage.vue"),
    },
    {
      path: "*",
      name: "error404",
      component: () => import("./views/404Page.vue"),
    },
  ],
});
