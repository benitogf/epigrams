<template>
  <md-card class="card-example">

    <md-dialog-prompt
      v-if="user"
      :md-theme="prompt.theme"
      :md-title="prompt.title"
      :md-ok-text="prompt.ok"
      :md-cancel-text="prompt.cancel"
      @close="onCloseDialog"
      v-model="prompt.value"
      ref="page">
    </md-dialog-prompt>

    <md-card-area md-inset>
      <md-card-header>
        <h2 class="md-title">{{id}}</h2>
        <div class="md-subhead">
          <span>{{user.account}}</span>
        </div>
      </md-card-header>
    </md-card-area>

    <md-card-content v-if="page && page.form">
      <md-list>
        <md-list-item>
          <span></span>
          <md-switch v-model="edit"></md-switch>
        </md-list-item>
      </md-list>
      <md-list-form :fields="page.form"
        :edit="edit"
        @sub="openDialogSub"
        @plus="plusForm">
      </md-list-form>
    </md-card-content>

  </md-card>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'tag',
  props: ['id'],
  computed: {
    ...mapGetters({
      user: 'currentUser',
      profile: 'profile'
    })
  },
  data: () => ({
    page: null,
    edit: true,
    prompt: {
      title: 'Create tag',
      ok: 'Done',
      cancel: 'Cancel',
      id: 'name',
      name: 'name',
      placeholder: 'Type the name...',
      maxlength: 30,
      value: '',
      theme: 'white'
    }
  }),
  methods: Object.assign(mapActions([
    'getPage',
    'setPage'
  ]), {
    openDialogSub (ref) {
      this.prompt.title = 'Create field'
      if (ref.id) {
        this.prompt.title += ' in ' + ref.id
      }
      this.prompt.value = ''
      this.$refs.page.open()
      this.ref = ref.id || 'root'
    },
    plusForm (data) {
      console.log(data.root, data.id)
      let page = Object.assign({}, this.page)
      let form = _.findIndex(page.form[data.root], ['id', data.id])
      console.log(form)
      page.form[data.root][form].data.push({})
      console.log(page)
      this.setPage({ tag: this.id, page: page })
    },
    onCloseDialog (ref) {
      if (this.prompt.value && ref === 'ok') {
        let page = Object.assign({}, this.page)
        if (!page.form[this.ref]) {
          page.form[this.ref] = []
        }

        if (!page.form[this.prompt.value]) {
          page.form[this.prompt.value] = []
        }

        page.form[this.ref].push({
          id: this.prompt.value,
          data: [{}]
        })
        this.setPage({ tag: this.id, page: page })
      }
    },
    async reload () {
      let base = {
        form: {
          root: []
        }
      }
      try {
        let page = await this.getPage(this.id)
        if (!page) {
          page = base
        }
        this.page = page
      } catch (e) {
        this.page = base
      }
    }
  }),
  watch: {
    async id () {
      Vue.nextTick(async () => {
        await this.reload()
      })
    }
  },
  async mounted () {
    await this.reload()
  }
}
</script>
