<template>
  <md-layout md-column md-flex md-align="center">
    <md-card>
      <md-card-header>
        <div class="md-title">
          <img class="logo" src="../assets/logo.png">
        </div>
        <div class="md-subhead">v0.1</div>
      </md-card-header>

      <md-card-content>
        <span v-if="error !== ''">{{error}}</span>
        <form novalidate
          @submit.stop.prevent.native="login(user)">
          <md-input-container>
            <label>Username</label>
            <md-input v-model="user.account"
              @keyup.native.13="login(user)"></md-input>
          </md-input-container>
          <md-input-container>
            <label>Password</label>
            <md-input v-model="user.password"
              type="password"
              @keyup.native.13="login(user)"></md-input>
          </md-input-container>
        </form>
      </md-card-content>

      <md-card-actions>
        <md-button @click.native="login(user)">Login</md-button>
      </md-card-actions>
    </md-card>
  </md-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'login',
  computed: {
    ...mapGetters({
      error: 'loginError'
    })
  },
  data: function () {
    return {
      user: {
        account: '',
        password: '',
        userType: 'employee'
      }
    }
  },
  methods: mapActions([
    'login'
  ])
}
</script>

<style lang="scss" scoped>

.md-card {
  min-width: 360px;
  align-self: flex-center;
}
.md-column {
  height: inherit;
  align-items: center;
}
</style>
