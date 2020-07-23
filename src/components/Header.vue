<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info" style="border:1px solid lightgrey; border-radius: 4px">
      <b-navbar-brand>Stock trader</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link class="nav-item" to="/" active-class="active" tag="li" exact>
              <a class="nav-link">Home</a>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link class="nav-item" to="/portfolio" active-class="active" tag="li">
              <a class="nav-link">Portfolio</a>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link class="nav-item" to="/stocks" active-class="active" tag="li">
              <a class="nav-link">Stocks</a>
            </router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item>Profile</b-dropdown-item>
            <b-dropdown-item>Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
