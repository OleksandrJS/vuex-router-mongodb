<!-- @format -->

<template>
  <div>
    <b-navbar toggleable="sm" type="dark" variant="info">
      <b-navbar-brand href="#">
        <router-link class="router-link" to="/">Home</router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
          </b-nav-form>
          <b-nav-item href="#">
            <a class="router-link" v-if="isLoggedIn" @click="logout">Logout</a>
            <router-link class="router-link" to="/login" v-else
              >Login</router-link
            >
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  // computed: mapGetters(["isLoggedIn"]),
  computed: mapGetters(['isLoggedIn']),

  methods: {
    async logout() {
      this.$store.dispatch('logout');
    },
  },
  mounted() {
    console.log(this.isLoggedIn);
  },
};
</script>

<style scoped>
.router-link {
  color: #fff;
  text-decoration: none;
}
</style>
