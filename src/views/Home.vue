<template>
  <div class="container-fluid">
    <app-header></app-header>
    <div class="row" style="margin-top: 20px">
      <div class="col-md-12">
        <h1>Clicca qui per iniziare un nuovo giorno!</h1>
        <hr />
        <p>Your Funds: {{ funds }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';

export default {
  computed: {
    funds() {
      return this.$store.getters.funds;
    }
  },
  components: {
    appHeader: Header
  }
};
</script>
