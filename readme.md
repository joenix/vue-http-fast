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
<http api="..." method="get" :params="{ hello: 'world' }" v-slot="{ data }">
  <div>{{ data }}</div>
</http>
```

## How to Secondary Request

```js
// Refresh according to the method set on the component
this.$refs.http.refresh(params, headers);

// Send request as method get
this.$refs.http.get(params, headers);

// Send request as method post
this.$refs.http.get(params, headers);
```

## Or it can be written in template like

```html
<http api="..." ref="http">
  <div>{{ data }}</div>

  <button @click="$refs.http.refresh">refresh</button>
  <button @click="$refs.http.get({ respect: false })">get</button>
  <button @click="$refs.http.post({ respect: true })">post</button>
</http>
```

## Tip

`vue-http-fast` do not have the ability to send requests, you need to configure the request class during registration

## Docs

| Name                | Type    | Default                                | Description                     |
| ------------------- | ------- | -------------------------------------- | ------------------------------- |
| api                 | String  | ''                                     | address for request             |
| method              | String  | get                                    | be used when making the request |
| params              | Object  | {}                                     | be sent with the request        |
| wait                | Boolean | true                                   | set rending after response      |
| http                | Promise | none                                   | reset tool of sending requests  |
| requestInterceptor  | Promise | (data, headers) => ({ data, headers }) | interceptor before request      |
| responseInterceptor | Promise | result => result                       | interceptor after response      |
