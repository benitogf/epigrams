<template>
  <md-list class="md-dense">
    <md-list-item v-for="(field, index) in fields[root]"
      :key="index">
      <span v-html="field.id"></span>
      <md-list-expand v-if="fields[field.id] instanceof Array">
        <md-list-item v-if="!edit"
          @click="fireClickEvent({ action: 'plus', root,  id: field.id })">
          <md-icon md-src="tag"></md-icon>{{field.id}}
        </md-list-item>
        <md-list-item v-for="(item, index) in field.data"
          class="md-list-form-item">
          <quill :id="field.id + index" class="quill-container"></quill>
        </md-list-item>
        <md-list-form :edit="edit"
          :fields="fields"
          @sub="fireClickEvent"
          @plus="fireClickEvent"
          :root="field.id">
        </md-list-form>
        <md-list-item v-if="edit && root === 'root'"
          @click="fireClickEvent({ action: 'sub', id: field.id })">
          <md-icon md-src="tag"></md-icon>{{field.id}}
        </md-list-item>
      </md-list-expand>
    </md-list-item>
    <md-list-item v-if="edit && root === 'root'"
      @click="fireClickEvent({ action: 'sub' })">
      <md-icon md-src="tag"></md-icon>
    </md-list-item>
  </md-list>
</template>

<script>
  export default {
    name: 'md-list-form',
    props: {
      fields: {
        type: Object,
        required: true
      },
      root: {
        type: String,
        default: 'root'
      },
      edit: Boolean
    },
    data: () => ({
      debounce: false
    }),
    methods: {
      fireClickEvent (data) {
        console.log(data)
        if (!this.debounce && data) {
          console.log(data)
          this.$emit(data.action, data)
        }
      }
    }
  }
</script>
