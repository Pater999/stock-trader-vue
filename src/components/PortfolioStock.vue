<template>
  <div class="col-sm-6 col-md-4">
    <div class="card border-secondary" style="margin-bottom:20px; width:100%">
      <h5 class="card-header">
        {{ stock.name }} <small>( Prezzo: {{ stock.price }}€ | Quantità: {{ stock.quantity }} )</small>
      </h5>
      <div class="card-body text-secondary">
        <div class="input-group mb-3">
          <input type="number" class="form-control" placeholder="Quantità" v-model="quantity" />
          <div class="input-group-append">
            <button class="btn btn-primary" type="button" @click="sellStock()" :disabled="quantity <= 0 || !Number.isInteger(parseFloat(quantity))">Vendi</button>
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
