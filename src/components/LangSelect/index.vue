<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <el-button v-if="isBtn" size="mini" type="primary">
      <svg-icon class-name="international-icon" icon-class="language" />
    </el-button>
    <div v-else>
      <svg-icon class-name="international-icon" icon-class="language" />
    </div>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language === 'zh'" command="zh">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language === 'en'" command="en">
        English
      </el-dropdown-item>
      <!-- <el-dropdown-item :disabled="language==='es'" command="es">
        Español
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='ja'" command="ja">
        日本語
      </el-dropdown-item> -->
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
// import { generateRouter } from '@/permission'

export default {
  props: {
    isBtn: {
      default: false,
      type: Boolean
    }
  },
  inject: ['reload'],
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      // 切换语言
      this.$store.dispatch('app/setLanguage', lang).then(() => {
        // 重新获取 路由
        this.reLoadRout()
      })

      this.$message({
        message: this.$t('langSelect.message'),
        type: 'success'
      })
      this.reload()
    },
    async reLoadRout() {
      await this.$store.dispatch('getMenuTree')
    }
  }
}
</script>
