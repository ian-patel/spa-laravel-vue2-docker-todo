<template>
  <div class="admin-layout" key="app" v-if="user">
    <left-sidebar theme="light" :items="items">
      <router-link slot="header" to="/" class="left-sidebar__header">
        <h1>📝</h1>
      </router-link>

      <el-dropdown slot="footer" class="left-sidebar__user">
        <div class="left-sidebar__username">😎 {{ user.name }}</div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">😔 Sign Out</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </left-sidebar>

    <div class="admin-layout__content">
      <div class="page-container">
        <div class="top-header" name="top-header" tag="header" v-if="user"></div>
        <div class="page-container__content">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      items: [
        {
          title: 'Dashboard',
          name: '/dashboard',
          route: 'dashboard',
          icon: '😬'
        },
        { title: 'Tasks', name: '/tasks', route: 'tasks', icon: '📝' },
        { title: 'Chart', name: '/chart', route: 'chart', icon: '📈' }
      ]
    };
  },
  computed: {
    ...mapGetters(['user', 'isLoggedIn'])
  },
  watch: {
    isLoggedIn(val) {
      if (!val)
        this.$router.push({
          name: 'login',
          query: { r: this.$route.fullPath }
        });
    }
  },
  methods: mapActions(['logout'])
};
</script>

<style lang="scss" scoped>
@import '~styles/_helpers';

.admin-layout {
  display: flex;
  align-items: flex-start;

  &__content {
    flex: 1;
    flex-shrink: 1;
  }

  .page-container {
    &__content {
      padding: $spacer;
    }
  }

  .top-header {
    display: flex;
    background-color: #fff;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
    height: $top-header-height;

    align-items: center;
    padding-left: $spacer;
    padding-right: $spacer;
  }
}

.left-sidebar {
  $p: &;

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $spacer;
    color: #e2e2e2;
  }

  &__user {
    width: 100%;
  }

  &__username {
    background-color: #555;
    color: #e2e2e2;
    padding: $spacer;
    text-align: center;
    cursor: pointer;

    &:hover {
      background-color: lighten(#555, 8%);
    }
  }
}
</style>
