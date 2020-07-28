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
          <b-form-input id="inputEmail4" v-model="form.email" :state="validEmail" aria-describedby="input-live-help input-live-feedback" placeholder="Email" trim></b-form-input>
          <b-form-invalid-feedback id="inputEmail4-feedback">
            Devi inserire una mail valida.
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputPassword">Password*</label>
          <b-form-input id="inputPassword" type="password" v-model="form.password" :state="validPassword" aria-describedby="input-live-help input-live-feedback" placeholder="Password" trim></b-form-input>
          <b-form-invalid-feedback id="inputPassword-feedback">
            La password deve avere almeno 6 caratteri.
          </b-form-invalid-feedback>
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword2">Conferma password*</label>
          <b-form-input id="inputPassword2" type="password" v-model="form.confirmPassword" :state="validConfirmPassword" aria-describedby="input-live-help input-live-feedback" placeholder="Conferma password" trim></b-form-input>
          <b-form-invalid-feedback id="inputPassword2-feedback">
            Le password non corrispondono.
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputNation">Nazione</label>
          <input v-model="form.country" type="text" class="form-control" id="inputNation" placeholder="Nazione" />
        </div>
        <div class="form-group col-md-6">
          <label for="inputYears">Età*</label>
          <b-form-input id="inputYears" type="number" v-model="form.years" :state="validYears" aria-describedby="input-live-help input-live-feedback" placeholder="Età" trim></b-form-input>
          <b-form-invalid-feedback id="inputYears-feedback">
            Devi inserire un numero maggiore di 18.
          </b-form-invalid-feedback>
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
      <button class="btn btn-lg btn-block" :disabled="!validEmail || !validPassword || !validConfirmPassword || !validYears" style="background-color: #32DE8A" type="submit">Registrati</button>

      <b-alert style="margin-top:20px" variant="warning" :show="errore != null" dismissible @dismissed="errore = null" fade>La mail inserita è già stata utilizzata!</b-alert>

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
      this.$store.dispatch('signup', this.form);
    }
  },
  computed: {
    validEmail() {
      let mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (this.form.email.match(mailformat)) return true;
      else return false;
    },
    validPassword() {
      return this.form.password.length > 5 ? true : false;
    },
    validConfirmPassword() {
      return this.form.password == this.form.confirmPassword && this.form.confirmPassword.length > 5 ? true : false;
    },
    validYears() {
      return this.form.years > 17 ? true : false;
    },
    errore: {
      get() {
        return this.$store.getters.error;
      },
      set(value) {
        this.$store.commit('storeError', value);
      }
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
  background-color: #a2e8dd;
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
