<template>
  <div>
    <form class="form-signin" @submit="onSubmit">
      <div class="text-center">
        <img class="mb-4" src="../assets/avatar.svg" alt="" width="130" height="130" />
        <h1 class="h3 mb-3 font-weight-normal">Login</h1>
      </div>

      <label for="inputEmail" class="sr-only">Indirizzo email</label>
      <input type="email" v-model="form.email" class="form-control" placeholder="Indirizzo email" required autofocus />
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" v-model="form.password" pattern=".{6,}" class="form-control" placeholder="Password" required />

      <button class="btn btn-lg btn-block" style="background-color: #32DE8A" type="submit">Accedi</button>
      <b-alert style="margin-top:20px" variant="warning" :show="errore != null" dismissible @dismissed="errore = null" fade>Email o password errati!</b-alert>

      <p class="mb-3 text-muted text-center" style="margin-top:20px">Non hai un account? <router-link to="/register" tag="a">Registrati</router-link></p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.$store.dispatch('login', { email: this.form.email, password: this.form.password });
    }
  },
  computed: {
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
  max-width: 360px;
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
