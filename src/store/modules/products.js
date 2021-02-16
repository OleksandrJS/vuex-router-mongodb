/** @format */

import axios from 'axios';

export default {
  state: {
    loading: false,
    products: JSON.parse(localStorage.getItem('products')) || {},
  },
  mutations: {
    products_request(state) {
      state.loading = true;
    },
    async products_request_success(state, data) {
      state.loading = false;
      state.products = await data;
    },
    products_request_error(state) {
      state.loading = false;
    },
  },
  actions: {
    async createProduct({ commit }, body) {
      try {
        commit('products_request');

        const { data } = await axios.post(
          'http://localhost:5002/product',
          { body },
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem('user')).token
              }`,
            },
          },
        );
        console.log(data);
        if (data) {
          commit('products_request_success', data);
          localStorage.setItem('products', JSON.stringify(data));
        }
      } catch (e) {
        commit('products_request_error', e);
        localStorage.removeItem('products');
      }
    },
    async fetchProducts({ commit, state }) {
      try {
        commit('products_request');
        const { data } = await axios.post(
          'http://localhost:5002/product',
          {},
          {
            headers: { Authorization: `Bearer ${state.user.token}` },
          },
        );
        console.log(data);
        if (data) {
          commit('products_request_success', data);
          localStorage.setItem('products', JSON.stringify(data));
        }
      } catch (e) {
        commit('products_request_error', e);
        localStorage.removeItem('products');
      }
    },
    // async register({ commit }, body) {
    //   try {
    //     commit('auth_request');
    //     const { data } = await axios.post(
    //       'http://localhost:5002/api/register',
    //       {
    //         email: body.email,
    //         password: body.password,
    //       },
    //     );
    //     if (data) {
    //       localStorage.setItem('user', JSON.stringify(data));
    //       commit('auth_success', data);
    //     }
    //   } catch (e) {
    //     commit('auth_error', e);
    //     localStorage.removeItem('user');
    //   }
    // },
  },
  getters: {
    // isLoggedIn(state) {
    //   return !!state.user.token;
    // },
    // authStatus: (state) => state.status,
    // isAdmin: (state) => state.user.isAdmin,
    // getId: (state) => state.user._id,
    // getEmail: (state) => state.user.email,
  },
};
