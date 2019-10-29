import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import VueCookies from "vue-cookies";
import VueI18n from "vue-i18n";
import textDescriptions from "./lang";
Vue.use(VueCookies);

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(VueI18n);

// In case we ever need support
// as of now used for textDescriptions
const i18n = new VueI18n({
  locale: "en",
  messages: textDescriptions
});

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
