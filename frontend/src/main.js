import Vue from "vue";
import App from "./App.vue";
import VueMq from "vue-mq";

Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    mobile: 767,
    tablet: 1025,
    desktop: 1367,
    bigDesktop: Infinity
  }
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
