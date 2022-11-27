<template>
  <el-card>
    <div slot="header">countTo</div>

    <el-card>
      文档地址：
      <a href="https://github.com/PanJiaChen/vue-countTo" target="_blank">
        https://github.com/PanJiaChen/vue-countTo
      </a>
    </el-card>
    <count-to
      ref="example"
      :start-val="_startVal"
      :end-val="_endVal"
      :duration="_duration"
      :decimals="_decimals"
      :separator="_separator"
      :prefix="_prefix"
      :suffix="_suffix"
      :autoplay="false"
      class="example"
    />
    <el-form :inline="true">
      <el-form-item label="startVal">
        <el-input
          v-model.number="setStartVal"
          type="number"
          name="startValInput"
        />
      </el-form-item>
      <el-form-item label="endVal">
        <el-input v-model.number="setEndVal" type="number" name="endVaInput" />
      </el-form-item>
      <el-form-item label="duration">
        <el-input
          v-model.number="setDuration"
          type="number"
          name="durationInput"
        />
      </el-form-item>
      <el-form-item>
        <div class="startBtn example-btn" @click="start">
          Start
        </div>
      </el-form-item>
      <el-form-item>
        <div class="pause-resume-btn example-btn" @click="pauseResume">
          pause/resume
        </div>
      </el-form-item>
      <br>
      <el-form-item label="decimals">
        <el-input
          v-model.number="setDecimals"
          type="number"
          name="decimalsInput"
        />
      </el-form-item>

      <el-form-item label="separator">
        <el-input v-model="setSeparator" name="separatorInput" />
      </el-form-item>

      <el-form-item label="prefix">
        <el-input v-model="setPrefix" name="prefixInput" />
      </el-form-item>
      <el-form-item label="suffix">
        <el-input v-model="setSuffix" name="suffixInput" />
      </el-form-item>
    </el-form>

    <el-alert
      title="<count-to :start-val='0' :end-val='2017' :duration='4000' :decimals='0' :separator=',' :prefix='¥ ' :suffix=' rmb' :autoplay=false>"
      type="info"
    />
  </el-card>
</template>

<script>
import countTo from 'vue-count-to'
export default {
  name: 'CountToDemo',
  components: { countTo },
  data() {
    return {
      setStartVal: 0,
      setEndVal: 2017,
      setDuration: 4000,
      setDecimals: 0,
      setSeparator: ',',
      setSuffix: ' rmb',
      setPrefix: '¥ '
    }
  },
  computed: {
    _startVal() {
      if (this.setStartVal) {
        return this.setStartVal
      } else {
        return 0
      }
    },
    _endVal() {
      if (this.setEndVal) {
        return this.setEndVal
      } else {
        return 0
      }
    },
    _duration() {
      if (this.setDuration) {
        return this.setDuration
      } else {
        return 100
      }
    },
    _decimals() {
      if (this.setDecimals) {
        if (this.setDecimals < 0 || this.setDecimals > 20) {
          alert('digits argument must be between 0 and 20')
          return 0
        }
        return this.setDecimals
      } else {
        return 0
      }
    },
    _separator() {
      return this.setSeparator
    },
    _suffix() {
      return this.setSuffix
    },
    _prefix() {
      return this.setPrefix
    }
  },
  methods: {
    start() {
      this.$refs.example.start()
    },
    pauseResume() {
      this.$refs.example.pauseResume()
    }
  }
}
</script>

<style scoped>
.example-btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: 500;
  text-align: center;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  line-height: 1.5;
  padding: 4px 15px;
  font-size: 12px;
  border-radius: 4px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  border-color: #d9d9d9;
}
.example-btn:hover {
  color: #4ab7bd;
  background-color: #fff;
  border-color: #4ab7bd;
}
.example {
  font-size: 50px;
  color: #f6416c;
  display: block;
  margin: 10px 0;
  text-align: center;
  font-size: 80px;
  font-weight: 500;
}

.startBtn {
  margin-left: 20px;
  font-size: 20px;
  color: #30b08f;
  background-color: #fff;
}
.startBtn:hover {
  background-color: #30b08f;
  color: #fff;
  border-color: #30b08f;
}
.pause-resume-btn {
  font-size: 20px;
  color: #e65d6e;
  background-color: #fff;
}
.pause-resume-btn:hover {
  background-color: #e65d6e;
  color: #fff;
  border-color: #e65d6e;
}
</style>
