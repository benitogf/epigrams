<template>
    <quill v-bind:id="'root' + user.account" class="quill-container"></quill>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters({
      user: 'currentUser',
      profile: 'profile'
    })
  },
  mounted () {
    // let self = this
    // angular.module('hub').controller('HubsController', HubsController)
    // angular.bootstrap(this.$el, ['hub'])
  }
}
</script>
