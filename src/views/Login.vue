<template>
  <div>
    <form class="form-signin" @submit="onSubmit">
      <div class="text-center">
        <img class="mb-4" src="../assets/avatar.svg" alt="" width="130" height="130" />
      </div>
      <h1 class="h3 mb-3 font-weight-normal">Login</h1>
      <label for="inputEmail" class="sr-only">Indirizzo email</label>
      <input type="email" v-model="form.email" class="form-control" placeholder="Indirizzo email" required autofocus />
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" v-model="form.password" pattern=".{6,}" class="form-control" placeholder="Password" required />
      <button class="btn btn-lg btn-primary btn-block" type="submit">Accedi</button>
      <p class="mt-5 mb-3 text-muted text-center">Non hai un account? <router-link to="/register" tag="a">Registrati</router-link></p>
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
  }
};
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
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
