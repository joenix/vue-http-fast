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
    async inLaunch(api, method, data) {
      return this.$http(api)[method](data);
    },

    // Empty
    empty(target = {}) {
      for (const i in target) {
        return false;
      }
      return true;
    },

    // Sender
    async send(params, header) {
      // No Props
      if (!this.api) {
        return;
      }

      // Get Data
      const { data, headers } = await this.requestInterceptor(params || this.params);

      // Send Request
      const response = await this.launch(this.api, this.method, data, header || headers);

      // Sync Template
      this.response = await this.responseInterceptor(response);

      // Export
      return this.response;
    },

    // Refresh
    async refresh(params, header) {
      return await this.send(params, header);
    },
  },

  async mounted() {
    await this.send();
  },
};
</script>