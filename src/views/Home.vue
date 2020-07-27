<template>
  <div class="row" style="margin-top: 20px">
    <div class="col-md-12">
      <b-jumbotron bg-variant="info" text-variant="white" border-variant="dark">
        <template v-slot:header>Benvenuto {{ username }}</template>

        <template v-slot:lead> </template>

        <hr class="my-4" />

        <p>
          Attualmente il tuo saldo è di <strong>{{ funds }}€</strong>
        </p>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    funds() {
      return this.$store.getters.funds;
    },
    username() {
      console.log(this.$store.getters.user);
      return null;
    }
  }
};
</script>
