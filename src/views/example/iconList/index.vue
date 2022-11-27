<template>
  <el-card header="点击复制图标" :body-style="{ padding: 0 }" class="box-card">
    <ul class="list-box">
      <template v-for="pathName of svgList">
        <li :key="pathName" class=" item">
          <div class="item-icon" @click="onCopyIcon(pathName)">
            <svg-icon :icon-class="pathName" />
          </div>
          <div>{{ pathName }}</div>
        </li>
      </template>
    </ul>
  </el-card>
</template>

<script>
import { svgList } from '@/icons/tools'
import { onCopy } from '@/utils'

// 01转换
const Z2o = i => Number(!i)

const positions = [
  {
    state: 0,
    opts: ['top', 'bottom']
  },
  {
    state: 0,
    opts: ['left', 'right']
  }
]

export default {
  data() {
    return {
      svgList,
      lastDirect: 0
    }
  },
  mounted() {},
  methods: {
    onCopyIcon(pathName) {
      const inconHtml = `<svg-icon icon-class="${pathName}" />`
      onCopy(inconHtml)
      this.$notify({
        title: '哎哟不错哦',
        message: `成功复制图标${pathName}`,
        type: 'success',
        position: this.getPosition()
      })
    },
    getPosition() {
      const str = positions.map(({ state, opts }) => opts[state]).join('-')
      this.lastDirect = Z2o(this.lastDirect)
      const changeState = positions[this.lastDirect]
      changeState.state = Z2o(changeState.state)
      return str
    }
  }
}
</script>

<style lang="scss" scoped>
.list-box {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
}

.item {
  box-shadow: 0px 0px 1px #ccc;
  margin: 5px;
  padding: 5px;
  & > div {
    text-align: center;
  }
  .item-icon {
    $height: 150px;
    height: $height;
    width: $height;
    line-height: $height;
    font-size: 2rem;
    cursor: pointer;
    transition: all 0.1s ease-in;
    &:hover {
      font-size: 6rem;
    }
  }
}
</style>
