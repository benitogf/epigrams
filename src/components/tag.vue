<template>
  <md-card class="card-example">
    <md-card-area md-inset>

      <md-card-header>
        <h2 class="md-title">{{id}}</h2>
        <div class="md-subhead">
          <span>{{user.account}}</span>
        </div>
      </md-card-header>

    </md-card-area>

    <md-card-content>
      <quill v-if="user && id" :id="id + user.account" class="quill-container"></quill>
    </md-card-content>

  </md-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'tag',
  props: ['id'],
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
