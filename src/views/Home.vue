<template>
  <div class="col-md-12">
    <h1>Clicca qui per iniziare un nuovo giorno!</h1>
    <hr />
    <p>Your Funds: {{ funds }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    funds() {
      return this.$store.getters.funds;
    }
  }
};
</script>
