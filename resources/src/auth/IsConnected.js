import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

export default (to, from, next) => {
  let accessToken = VueCookies.isKey("ob_token");
  if (accessToken) {
     next("/app/obreport");
  } else {
    return next();
  }
};
