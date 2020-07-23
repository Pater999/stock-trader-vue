<template>
  <div class="col-sm-6 col-md-4 mr-auto">
    <div class="card border-secondary" style="margin-bottom:20px">
      <h5 class="card-header">
        {{ stock.name }} <small>( Prezzo: {{ stock.price }}€ )</small>
      </h5>
      <div class="card-body text-secondary">
        <div class="input-group mb-3">
          <input type="number" class="form-control" placeholder="Quantità" v-model="quantity" />
          <div class="input-group-append">
            <button class="btn btn-success" type="button" @click="buyStock()" :disabled="quantity <= 0 || !Number.isInteger(parseFloat(quantity))">Compra</button>
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
  methods: {
    buyStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: parseInt(this.quantity)
      };
      this.quantity = 0;
      console.log(order);
    }
  },
  // Proprietà dall'esterno
  props: ['stock']
};
</script>
