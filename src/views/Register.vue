<!-- @format -->

<template>
  <div id="app" class="container mt-5 mb-5" style="width: 500px">
    <div class="card">
      <h3 class="card-header text-center">Register</h3>
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              v-model="user.email"
              id="email"
              name="email"
              class="form-control"
              :class="{ 'is-invalid': submitted && $v.user.email.$error }"
            />
            <div
              v-if="submitted && $v.user.email.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.user.email.required">Email is required</span>
              <span v-if="!$v.user.email.email">Email is invalid</span>
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              v-model="user.password"
              id="password"
              name="password"
              class="form-control"
              :class="{ 'is-invalid': submitted && $v.user.password.$error }"
            />
            <div
              v-if="submitted && $v.user.password.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.user.password.required"
                >Password is required</span
              >
              <span v-if="!$v.user.password.minLength"
                >Password must be at least 6 characters</span
              >
            </div>
          </div>

          <div class="form-group">
            <button class="btn btn-primary">Register</button>
          </div>
        </form>
        <div>
          lready have an account?
          <router-link class="router-link" to="/login">Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      submitted: false,
    };
  },
  computed: mapGetters(["isLoggedIn"]),
  validations: {
    user: {
      email: { required, email },
      password: { required, minLength: minLength(4) },
    },
  },
  methods: {
    async handleSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      try {
        this.$store
          .dispatch("register", {
            email: this.user.email,
            password: this.user.password,
          })
          .then(() => this.$router.push("/"));
      } catch (e) {
        console.log(e.response.data.message);
      }
    },
  },
  mounted() {
    if (this.isLoggedIn) {
      this.$router.push("/");
    }
  },
};
</script>

<style lang="scss" scoped></style>
