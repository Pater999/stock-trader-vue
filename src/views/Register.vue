<template>
  <div>
    <form class="form-signin" @submit="onSubmit">
      <h1 class="h3 mb-3 font-weight-normal text-center">Registrati</h1>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputName">Nome</label>
          <input v-model="form.name" type="text" class="form-control" id="inputName" placeholder="Nome" autofocus />
        </div>
        <div class="form-group col-md-6">
          <label for="inputCognome">Cognome</label>
          <input v-model="form.surname" type="text" class="form-control" id="inputCognome" placeholder="Cognome" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-12">
          <label for="inputEmail4">Email*</label>
          <input v-model="form.email" type="email" class="form-control" id="inputEmail4" placeholder="Email" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputPassword">Password*</label>
          <input v-model="form.password" type="password" class="form-control" id="inputPassword" placeholder="Password" pattern=".{6,}" required />
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword2">Conferma password*</label>
          <input v-model="form.confirmPassword" type="password" class="form-control" id="inputPassword2" placeholder="Conferma password" pattern=".{6,}" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputNation">Nazione</label>
          <input v-model="form.country" type="text" class="form-control" id="inputNation" placeholder="Nazione" />
        </div>
        <div class="form-group col-md-6">
          <label for="inputYears">Età*</label>
          <input v-model="form.years" type="number" class="form-control" id="inputYears" required />
        </div>
      </div>
      <div class="form-group">
        <div class="form-check">
          <input v-model="form.terminiCondizioni" class="form-check-input" type="checkbox" id="gridCheck" required />
          <label class="form-check-label" for="gridCheck">
            Accetta termini e condizioni
          </label>
        </div>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Registrati</button>
      <p class="mt-5 mb-3 text-muted text-center">Sei già registrato? <router-link to="/login" tag="a">Accedi</router-link></p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
        name: '',
        surname: '',
        confirmPassword: '',
        years: '',
        country: '',
        terminiCondizioni: false
      }
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    }
  }
};
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 730px;
  padding: 15px;
  margin: auto;
  border: solid 1px lightgray;
  background-color: whitesmoke;
  border-radius: 10px;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
