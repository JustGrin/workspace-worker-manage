<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <app-main />
    </div>
    <el-backtop :target="scrollTarget" :bottom="60" />
  </div>
</template>

<script>
import defaultSettings from '@/settings'
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

const { scrollTarget } = defaultSettings

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  data() {
    return {
      scrollTarget
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    language() {
      return this.$store.state.app.language
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      const { opened, withoutAnimation } = this.sidebar
      return {
        hideSidebar: !opened,
        enStyle: opened && this.language === 'en',
        openSidebar: opened,
        withoutAnimation: withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: auto; // 为了 el-backtop 而设置
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  // 滚动条设置
  &::-webkit-scrollbar {
    width: 5px;
    background: #dfe6ea;
    &:hover {
      background-color: #7099f9;
    }
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
