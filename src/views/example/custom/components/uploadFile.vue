<template>
  <div>
    <el-card>
      <div slot="header">
        <el-button type="primary" @click="downLoad"> 点击下载</el-button>
        -------------------- 查看
      </div>
      <el-row>
        <el-col :span="8">
          <Rupload v-model="baseId" preview />
        </el-col>
        <el-col :span="16">
          <Rupload v-model="baseId" is-img preview />
        </el-col>
      </el-row>
    </el-card>

    <el-card>
      <div slot="header">
        是否默认businessId <el-switch v-model="isV" /> -------------- 增删
      </div>
      <el-row>
        <el-col :span="8">
          <Rupload v-model="businessId" />
        </el-col>
        <el-col :span="16">
          <Rupload v-model="businessId" is-img />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import Rupload from '@/components/r-upload'
import { downloadFileByUrl } from '@/api/file'

export default {
  components: {
    Rupload
  },
  data() {
    return {
      baseId: '1287680650063695873',
      businessId: '',
      isV: false,
      fielId: '1287684662674640898'
    }
  },
  watch: {
    isV(v) {
      if (v) {
        this.businessId = this.baseId
      } else {
        this.businessId = ''
      }
    },
    businessId(v) {
      console.log('businessId-内部变化')
    }
  },
  methods: {
    downLoad() {
      downloadFileByUrl(this.fielId)
    }
  }
}
</script>

<style lang="scss" scoped></style>
