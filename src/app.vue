<template>
  <div class="container">
    <md-dialog-prompt
      v-if="user"
      :md-theme="prompt.theme"
      :md-title="prompt.title"
      :md-ok-text="prompt.ok"
      :md-cancel-text="prompt.cancel"
      @close="onCloseDialog"
      v-model="prompt.value"
      ref="tag">
    </md-dialog-prompt>
    <md-whiteframe v-if="user" md-tag="md-toolbar" md-elevation="1" class="main-header">
      <md-button class="md-icon-button nav-trigger" @click="toggleSidenav">
        <md-icon md-src="menu">menu</md-icon>
      </md-button>
    </md-whiteframe>
    <md-sidenav v-if="user" class="main-sidebar md-left md-fixed"
      md-swipeable ref="main-sidebar">
      <md-toolbar class="logo">
        <router-link exact to="/">
          <md-icon md-src="corsarial"></md-icon>
        </router-link>
      </md-toolbar>

      <div class="main-sidebar-links">
        <md-list>
          <md-list-item>
            <span></span><md-switch v-model="edit" id="my-test0" name="my-test0"></md-switch>
          </md-list-item>
        </md-list>
        <md-list-tree :edit="edit"
          :tags="tags"
          @action="openDialog">
        </md-list-tree>
      </div>
    </md-sidenav>
    <transition name="md-router" appear>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  toolbar: true,
  computed: {
    ...mapGetters({
      user: 'currentUser',
      tags: 'getTags'
    })
  },
  data: () => ({
    edit: false,
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
    'setTags'
  ]), {
    openDialog (ref) {
      this.prompt.title = 'Create tag'
      if (ref) {
        this.prompt.title += ' in ' + ref
      }
      this.prompt.value = ''
      this.$refs.tag.open()
      this.ref = ref || 'root'
    },
    closeDialog (ref) {
      this.$refs.tag.close()
    },
    onCloseDialog (ref) {
      if (this.prompt.value && ref === 'ok') {
        let tags = Object.assign({}, this.tags)
        if (!tags[this.ref]) {
          tags[this.ref] = []
        }
        tags[this.ref].push(this.prompt.value)
        this.setTags(tags)
      }
    },
    toggleSidenav () {
      this.$refs['main-sidebar'].toggle()
    },
    closeSidenav () {
      this.$refs['main-sidebar'].close()
    },
    open (ref) { },
    close (ref) { },
    logout () {
      this.$refs.rightSidenav.close()
      return this.$store.dispatch('logout')
    }
  })
}
</script>

<style lang="scss">
  @import 'node_modules/vue-material/src/core/stylesheets/variables.scss';

  $sizebar-size: 280px;

  [v-cloak] {
    display: none;
  }

  html,
  body {
    height: 100%;
    overflow: hidden;
  }

  body {
    display: flex;
  }

  .container {
    min-height: 100%;
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
    transition: $swift-ease-out;

    @media (min-width: 1281px) {
      padding-left: $sizebar-size;
    }
  }
  .main-header {
    @media (min-width: 1281px) {
      display: none !important;
    }
  }

  .main-sidebar.md-sidenav {
    .md-sidenav-content {
      width: $sizebar-size;
      display: flex;
      flex-flow: column;
      overflow: hidden;

      @media (min-width: 1281px) {
        top: 0;
        pointer-events: auto;
        transform: translate3d(0, 0, 0) !important;
        box-shadow: $material-shadow-2dp;
      }
    }

    .md-backdrop {
      @media (min-width: 1281px) {
        opacity: 0;
        pointer-events: none;
      }
    }

    .md-toolbar {
      min-height: 172px;
      border-bottom: 1px solid rgba(#000, .12);
    }

    .logo {
      font-size: 24px;
      .md-icon {
        width: 111px;
        height: auto;
      }
      a {
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        color: inherit;
        text-decoration: none;

        &:hover {
          color: inherit;
          text-decoration: none;
        }
      }

      img {
        width: 160px;
        margin-bottom: 16px;
      }
    }

    .main-sidebar-links {
      overflow: auto;
      flex: 1;

      .md-inset .md-list-item-container {
        padding-left: 36px;
      }

      .md-list-item-container {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }

  .main-content {
    padding: 16px;
    flex: 1;
    overflow: auto;
    background-color: #fff;
    transform: translate3D(0, 0, 0);
    transition: $swift-ease-out;
    transition-delay: .2s;
  }

  .md-router-enter,
  .md-router-leave {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;

    @media (min-width: 1281px) {
      left: $sizebar-size;
    }

    .main-content {
      opacity: 0;
      overflow: hidden;
    }
  }

  .md-router-leave {
    z-index: 1;
    transition: $swift-ease-in;
    transition-duration: .25s;
  }

  .md-router-enter {
    z-index: 2;
    transition: $swift-ease-out;

    .main-content {
      transform: translate3D(0, 10%, 0);
    }
  }

  code {
    &:not(.hljs) {
      margin-left: 1px;
      margin-right: 1px;
      padding: 0 4px;
      display: inline-block;
      border-radius: 2px;
      font-family: "Operator Mono", "Fira Code", Menlo, Hack, "Roboto Mono", "Liberation Mono", Monaco, monospace;

      pre {
        margin: 8px 0;
      }
    }
  }

  .phone-viewport {
    width: 360px;
    height: 540px;
    margin-right: 16px;
    display: inline-block;
    position: relative;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid rgba(#000, .12);
  }
</style>
