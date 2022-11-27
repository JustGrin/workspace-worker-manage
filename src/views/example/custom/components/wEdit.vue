<template>
  <div>
    <el-card>
      参考地址:
      <a href="https://www.kancloud.cn/wangfupeng/wangeditor3/332599" target="_blank">
        https://www.kancloud.cn/wangfupeng/wangeditor3/332599
      </a>
    </el-card>

    <div class="w-edit">
      <ChatEdit v-model="input" />
    </div>
    <div class="text-content">
      <RichText :content="input" />
    </div>
  </div>
</template>

<script>
import ChatEdit from '@/components/r-chat-edit'
import RichText from '@/components/r-chat-edit/RichText'

export default {
  components: {
    ChatEdit,
    RichText
  },
  data() {
    return {
      input: [],
      text: ''
    }
  },
  watch: {
    input() {
      console.log(this.input)
    }
  },
  mounted() {},
  methods: {
    onChange(json) {
      this.input = json
    },
    onSubmit() {
      this.text = this.input
      this.input = []
    }
  }
}
</script>

<style>
.w-edit {
  /* border: 1px solid #ccc; */
  height: 150px;
}
.text-content {
}
</style>
