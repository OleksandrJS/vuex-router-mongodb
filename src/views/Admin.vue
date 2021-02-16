<!-- @format -->

<template>
  <div id="app" class="container mt-5 mb-5" style="width: 500px">
    <div class="card">
      <h3 class="card-header text-center">Create product</h3>
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="title">Title</label>
            <input
              type="text"
              v-model="user.title"
              id="title"
              name="title"
              class="form-control"
              :class="{ 'is-invalid': submitted && $v.user.title.$error }"
            />
            <div
              v-if="submitted && $v.user.title.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.user.title.required">Title is required</span>
              <span v-if="$v.user.title.minlength && $v.user.title.minlength"
                >Title is invalid</span
              >
            </div>
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              type="text"
              v-model="user.description"
              id="description"
              name="description"
              class="form-control"
              :class="{ 'is-invalid': submitted && $v.user.description.$error }"
            />
            <div
              v-if="submitted && $v.user.description.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.user.description.required"
                >Description is required</span
              >
              <span v-if="!$v.user.description.minLength"
                >Description must be at least 10 characters</span
              >
            </div>
          </div>
          <div class="form-group">
            <label for="price">Price</label>
            <input
              type="text"
              id="price"
              v-model="user.price"
              name="price"
              class="form-control"
              :class="{ 'is-invalid': submitted && $v.user.price.$error }"
            />
            <div
              v-if="submitted && $v.user.price.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.user.price.required">Price is required</span>
              <span v-if="!$v.user.price.minLength"
                >Price must be at least 1 digits</span
              >
              <span v-if="!$v.user.price.maxLength"
                >Price must be at most 5 digits</span
              >
              <span class="ml-2" v-if="!$v.user.price.numeric"
                >Only digits allowed</span
              >
            </div>
          </div>
          <label for="price">Image</label>
          <b-form-file
            v-model="file"
            id="image"
            :state="Boolean(file)"
            placeholder="Choose image or drop it here..."
            drop-placeholder="Drop "
          ></b-form-file>
          <span v-if="submitted && !$v.file.required" class="error">
            Upload image
          </span>

          <div class="form-group">
            <button class="btn btn-primary mt-5">Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  numeric,
  requiredIf,
} from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';

// import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      user: {
        title: '',
        description: '',
        price: '',
      },
      submitted: false,
      file: null,
    };
  },
  computed: mapGetters(['isAdmin']),
  validations: {
    user: {
      title: { required, minLength: minLength(1), maxLength: maxLength(10) },
      description: { required, minLength: minLength(10) },
      price: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(5),
        numeric,
      },
    },
    file: {
      required: requiredIf(function() {
        return this.file === null; // New changes
      }),
    },
  },
  methods: {
    async handleSubmit() {
      // console.log(this.file);
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      try {
        this.$store.dispatch('createProduct', {
          title: this.user.title,
          description: this.user.description,
          price: Number(this.user.price),
          image: './favicon.ico',
        });
        // .then(() => this.$router.push('/'));
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    if (!this.isAdmin) {
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
.error {
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}
</style>
