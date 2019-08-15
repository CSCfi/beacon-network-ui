import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Home,
      children: [
        {
          path: "",
          name: "home",
          component: () => import("./components/HomeTabs.vue")
        },
        {
          path: "results",
          name: "searchresults",
          props: true,
          component: () => import("./components/BeaconResults.vue")
        }
      ]
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
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
    }
  ]
});
