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
          component: () => import("./components/HomeTabs.vue"),
          meta: { hideSmallLogo: true }
        },
        {
          path: "results",
          name: "searchresults",
          props: true,
          component: () => import("./components/BeaconResults.vue"),
          meta: { hideSmallLogo: false }
        }
      ]
    },
    {
      path: "/join",
      name: "join",
      component: () => import("./views/Join.vue")
    },
    {
      path: "/docs",
      name: "docs",
      component: () => import("./views/Docs.vue")
    },
    {
      path: "/tos",
      name: "tos",
      component: () => import("./views/Tos.vue")
    },
    {
      path: "/privacy",
      name: "privacy",
      component: () => import("./views/Privacy.vue")
    }
  ]
});
