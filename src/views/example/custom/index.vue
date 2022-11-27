<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card>
          <div slot="header">空数据</div>
          <noData />
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <div slot="header">聊天输入框</div>
          <chatBox />
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <div slot="header">wangEdit</div>
          <wEdit />
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card>
          <div slot="header">文件上传组件</div>
          <UploadFile />
        </el-card>
      </el-col>
    </el-row>
    <br>
 
  </div>
</template>

<script>
import noData from './components/noData'
import chatBox from './components/chatBox'
import wEdit from './components/wEdit'
import UploadFile from './components/uploadFile'

export default {
  components: {
    noData,
    chatBox,
    wEdit,
    UploadFile
  }
}
</script>

<style lang="scss" scoped></style>
