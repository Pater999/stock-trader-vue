<template>
  <div class="col-sm-6 col-md-4">
    <div class="card border-secondary" style="margin-bottom:20px; width:100%">
      <h5 class="card-header" style="background-color: #32DE8A">
        {{ stock.name }} <small>( Prezzo: {{ stock.price }}€ )</small>
      </h5>
      <div class="card-body text-secondary">
        <div class="input-group mb-3">
          <input type="number" class="form-control" :class="{ danger: insufficientFunds }" placeholder="Quantità" v-model="quantity" />
          <div class="input-group-append">
            <button class="btn" style="background-color: #32DE8A" type="button" @click="buyStock()" :disabled="quantity <= 0 || !Number.isInteger(parseFloat(quantity)) || insufficientFunds">Compra</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: 0
    };
  },
  computed: {
    funds() {
      return this.$store.getters.funds;
    },
    insufficientFunds() {
      return this.quantity * this.stock.price > this.funds;
    }
  },
  methods: {
    buyStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: parseInt(this.quantity)
      };
      this.$store.dispatch('buyStock', order);
      this.quantity = 0;
    }
  },
  // Proprietà dall'esterno
  props: ['stock']
};
</script>

<style scoped>
.danger {
  border: 2px solid red;
}
.danger:focus {
  border-bottom: 3px solid red;
}
</style>
