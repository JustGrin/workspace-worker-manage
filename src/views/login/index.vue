<template>
  <div class="login-container">
    <CanvsBg />
    <div class="content-box">
      <div class="switch-lang">
        <lang-select is-btn />
      </div>
      <div class="loginImg">
        <!-- <img src="/img/login_banner.png" style="height:100%; width:100%"> -->
        <svg-icon icon-class="logo" />
        <el-image src="/img/login_img.png" />
      </div>
      <div class="form-box">
        <div class="title-container">
          <h3 class="title">管理平台</h3>
        </div>
        <transition name="rotate-x" appear mode="out-in">
          <component :is="currentComponent" />
        </transition>
      </div>
    </div>

    <div class="footer-copyright">
      {{ copyRight }}
    </div>
  </div>
</template>

<script>
import CanvsBg from '@/components/Canvas'
import LangSelect from '@/components/LangSelect'
import defaultSetting from '@/settings'
import { mapGetters } from 'vuex'
import PwdLogin from './components/PwdLogin'
import NoteLogin from './components/NoteLogin'
import RecoverPwd from './components/RecoverPwd'
import ResetPwd from './components/ResetPwd'

const { copyRight } = defaultSetting

export default {
  name: 'Login',
  components: {
    CanvsBg,
    LangSelect,
    PwdLogin,
    NoteLogin,
    RecoverPwd,
    ResetPwd
  },
  provide() {
    return {
      changeComponent: this.changeComponent
    }
  },
  data() {
    return {
      copyRight: `${copyRight} 版权信息`,
      currentComponent: 'PwdLogin'
    }
  },
  computed: {
    ...mapGetters(['loading'])
  },
  methods: {
    changeComponent(v) {
      this.currentComponent = v
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  background-color: #fff;
  overflow: hidden;
  // 内容
  .content-box {
    display: flex;
    width: 800px;
    margin: 45vh auto auto;
    transform: translateY(-50%);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.14);
    border-radius: 4px 0px 0px 4px;
    position: relative;

    .switch-lang {
      position: absolute;
      right: 0;
      top: 0;
    }
    .loginImg {
      width: 50%;
      font-size: 100px;
      background: #f7f8fa;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .form-box {
      width: 50%;
      padding: 6% 8%;
      background: #fff;
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #000;
      margin: 0px auto 40px auto;
      text-align: center;
    }
  }

  // 下载 app 的 二维码
  .app-qr-codes {
    position: fixed;
    width: 100%;
    text-align: right;
    padding-right: 20px;
    .el-button {
      font-size: 30px;
    }
  }
  // 页脚版权
  .footer-copyright {
    position: fixed;
    bottom: 0;
    text-align: center;
    /* left: 50%; */
    /* right: 50%; */
    width: 100%;
    line-height: 100px;
    color: #999;
  }
}

// .slide-fade-enter {
//   transform: translateX(50px);
//   opacity: 0;
// }
// .slide-fade-leave-to {
//   /* .slide-fade-leave-active for below version 2.1.8 */
//   transform: translateX(-50px);
//   opacity: 0;
// }
</style>
