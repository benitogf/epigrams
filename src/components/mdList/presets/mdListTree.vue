<template>
  <md-list class="md-dense">
    <md-list-item v-for="(tag, index) in tags[tag]" :key="index">
      <span v-if="edit" v-html="tag"></span>
      <router-link v-if="!edit" exact :to="'/tag/' + tag" v-html="tag"></router-link>
      <md-list-expand v-if="tags[tag] instanceof Array">
          <md-list-tree :edit="edit"
            :tags="tags"
            @action="fireClickEvent"
            :tag="tag">
          </md-list-tree>
      </md-list-expand>
    </md-list-item>
    <md-list-item v-if="edit" v-for="(tag, index) in tags[tag]" :key="index"
      @click="fireClickEvent(tag)">
      <md-icon md-src="tag"></md-icon>{{tag}}
    </md-list-item>
    <md-list-item v-if="edit && tag === 'root'" @click="fireClickEvent()">
      <md-icon md-src="tag"></md-icon>
    </md-list-item>
  </md-list>
</template>

<script>
  export default {
    name: 'md-list-tree',
    props: {
      tags: {
        type: Object,
        required: true
      },
      tag: {
        type: String,
        default: 'root'
      },
      edit: Boolean
    },
    data: () => ({
      debounce: false
    }),
    methods: {
      fireClickEvent (type) {
        if (!this.debounce) {
          this.$emit('action', type)
        }
      }
    }
  }
</script>
