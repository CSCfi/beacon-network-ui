import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import VueCookies from "vue-cookies";
import VueI18n from "vue-i18n";
import { getLangCookie } from "./lang";
import translations from "./lang";
Vue.use(VueCookies);

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: getLangCookie(),
  messages: translations
});

new Vue({
  router,
  i18n,
  methods: {
    setCookieLang: function() {
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 1);
      document.cookie =
        "OBJ_UI_LANG=" +
        i18n.locale +
        "; path=/; expires=" +
        expiryDate.toUTCString();
    }
  },
  render: h => h(App)
}).$mount("#app");
