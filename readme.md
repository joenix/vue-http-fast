# vue-http-fast

> simplly http request in vue component

## How to install

```sh
yarn add vue-http-fast
# or
npm i vue-http-fast
```

```js
import vueHttpFast from 'vue-http-fast';

// in Vue 2
Vue.use(vueHttpFast, { ...options });

// in Vue 3
App.use(vueHttpFast, { ...options });

// Option Example
options = {
  async launch(api, method, data) {
    return axios({
      method: 'get',
      url: api,
      data,
    });
  },
};
```

## How to use

```html
<http api="..." :params="{ hello: 'world' }" v-slot="{ data }">
  <div>{{ data }}</div>
</http>
```

## Tip

`vue-http-fast` do not have the ability to send requests, you need to configure the request class during registration

## Docs

| Name                | Type    | Description                     |
| ------------------- | ------- | ------------------------------- |
| api                 | String  | address for request             |
| method              | String  | be used when making the request |
| params              | Object  | be sent with the request        |
| wait                | Boolean | set rending after response      |
| http                | Promise | reset tool of sending requests  |
| requestInterceptor  | Promise | interceptor before request      |
| responseInterceptor | Promise | interceptor after response      |
