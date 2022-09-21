// Use Component
import http from './http.vue';

// Preset for Options
const preset = {
  name: 'http',
};

export default {
  install(App, options = {}) {
    // Merge First
    const { name, launch } = Object.assign(preset, options);

    // Configure Launch
    App.config.globalProperties.vueHttpFastLaunch = launch;

    // Component Register
    App.component(name, http);
  },
};
