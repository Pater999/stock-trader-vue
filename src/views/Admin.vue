<template>
  <div>
    <div class="row" style="margin-top: 20px">
      <div class="col-md-12"><b-button @click="prezziRandom()" block variant="success">Aggiorna prezzi random</b-button></div>
    </div>

    <div class="row" style="margin-top: 20px">
      <div class="col-md-12">
        <div v-if="rows == 0" class="d-flex justify-content-center mb-3" style="margin-top:60px">
          <b-spinner label="Loading..."></b-spinner>
        </div>
        <h2 v-if="rows > 0">Lista utenti</h2>
        <b-table id="my-table" :items="users" :per-page="perPage" :current-page="currentPage" small></b-table>
        <div v-if="rows / perPage > 1"><b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table" align="fill"></b-pagination></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      perPage: 20,
      currentPage: 1,
      users: []
    };
  },
  mounted() {
    axios
      .get('https://vue-js-http-97a40.firebaseio.com/users/.json' + '?auth=' + this.idToken)
      .then((response) => {
        // eslint-disable-next-line no-unused-vars
        Object.entries(response.data).forEach(([key, value]) => {
          this.users.push(value);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed: {
    rows() {
      return this.users.length;
    },
    idToken() {
      return this.$store.getters.idToken;
    }
  },
  methods: {
    ...mapActions(['randomizeStocks']),
    prezziRandom() {
      this.randomizeStocks();
    }
  }
};
</script>
