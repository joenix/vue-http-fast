import httpFast from './http-fast.vue';

export default {
  install(App, options) {
    App.component('http-fast', httpFast);
  },
};
