<template>
  <slot :data="response" v-if="visual" />
</template>

<script>
export default {
  name: 'http',

  data() {
    return {
      response: {},
    };
  },

  props: {
    // API - Address
    api: {
      type: [String],
      default: '',
    },

    // Method - get, post, put, head, patch, delete
    method: {
      type: [String],
      default: 'get',
    },

    // Params - Json
    params: {
      type: [Object],
      default: {},
    },

    // Immediate
    immediate: {
      type: [Boolean],
      default: true,
    },

    // Wait for Rending
    wait: {
      type: [Boolean],
      default: true,
    },

    // Functional for HTTP
    http: {
      type: [Function, Promise, Object],
      default() {
        return null;
      },
    },

    // Request Interceptor
    requestInterceptor: {
      type: [Function, Promise],
      default() {
        return (data, headers) => ({ data, headers });
      },
    },

    // Response Interceptor
    responseInterceptor: {
      type: [Function, Promise],
      default() {
        return result => result;
      },
    },
  },

  computed: {
    launch() {
      return this.http || this.vueHttpFastLaunch || this.inLaunch;
    },

    visual() {
      // Wait for Rending
      if (this.wait) {
        return !this.empty(this.response);
      }

      // Normal
      return true;
    },
  },

  methods: {
    // Built-In Launch
    async inLaunch(api, method, data, headers = { 'Content-Type': 'application/json' }) {
      return await this.$http(api)[method](data, { headers });
    },

    // Empty
    empty(target = {}) {
      for (const i in target) {
        return false;
      }
      return true;
    },

    // Sender
    async send(params, method, header) {
      // No Props
      if (!this.api) {
        return;
      }

      // Get Data
      const { data, headers } = await this.requestInterceptor(params || this.params);
      // console.log(1, 'in send, method:', this.method, method);
      // console.log(2, 'in send, data:', data, params);
      // Send Request
      const response = await this.launch(this.api, method || this.method, data, header || headers);

      // Sync Template
      this.response = await this.responseInterceptor(response);

      // Export
      return this.response;
    },

    // Quick Get
    async get(params, header) {
      return await this.send(params, 'get', header);
    },

    // Quick Post
    async post(params, header) {
      console.log(100, params, 200, header);
      return await this.send(params, 'post', header);
    },

    // Refresh
    async refresh(params, header) {
      return await this.send(params, null, header);
    },
  },

  async mounted() {
    if (this.immediate) {
      await this.send();
    }
  },
};
</script>
