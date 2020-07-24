<template>
  <div class="col-sm-6 col-md-4">
    <div class="card border-info" style="margin-bottom:20px; width:100%">
      <h5 class="card-header" style="background-color: #627C85">
        {{ stock.name }} <small>( Prezzo: {{ stock.price }}€ | Quantità: {{ stock.quantity }} )</small>
      </h5>
      <div class="card-body text-secondary">
        <div class="input-group mb-3">
          <input type="number" class="form-control" :class="{ danger: insufficientQuantity }" placeholder="Quantità" v-model="quantity" />
          <div class="input-group-append">
            <button class="btn" style="background-color: #627C85" type="button" @click="sellStock()" :disabled="insufficientQuantity || quantity <= 0 || !Number.isInteger(parseFloat(quantity))">Vendi</button>
            {{ insufficientQuantity }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      quantity: 0
    };
  },
  computed: {
    insufficientQuantity() {
      return this.quantity > this.stock.quantity;
    }
  },
  methods: {
    ...mapActions(['sellStock']),
    sellStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity
      };
      console.log(order);
      this.sellStock();
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
