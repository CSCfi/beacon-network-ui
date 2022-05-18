import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

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
      component: Home,
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
      component: () => import("./views/Join.vue"),
    },
    {
      path: "/docs",
      name: "docs",
      component: () => import("./views/Docs.vue"),
    },
    {
      path: "/docsapi",
      name: "docsapi",
      component: () => import("./views/DocsApi.vue"),
    },
    {
      path: "/tos",
      name: "tos",
      component: () => import("./views/Tos.vue"),
    },
    {
      path: "/privacy",
      name: "privacy",
      component: () => import("./views/Privacy.vue"),
    },
    {
      path: "/guide",
      name: "guide",
      component: () => import("./views/Guide.vue"),
    },
    {
      path: "/accessibility",
      name: "accessibility",
      component: () => import("./views/Accessibility.vue"),
    },
    {
      path: "/datasets",
      name: "datasets",
      component: () => import("./views/beaconDatasets.vue"),
    },
    {
      path: "/history",
      name: "history",
      component: () => import("./views/History.vue"),
    },
    {
      path: "*",
      name: "error404",
      component: () => import("./views/404.vue"),
    },
    {
      path: "/callback",
      name: "callback",
      component: () => import("./views/Callback.vue"),
    },
  ],
});
