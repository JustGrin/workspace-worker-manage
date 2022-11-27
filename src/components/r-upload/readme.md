category: Components
cols: 1
type: Data Display
title: r-upload
subtitle: 文件上传工具

---

文件上传

## 何时使用

- 当需要上传文件/图片时
- 当需要展示文件列表和上传的图片时。

## 如何使用

使用`v-model`绑定 `value` 既是 文件业务 ID(`businessId`)。

```vue
<template>
  <Rupload v-model="businessId" is-img preview />
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
      businessId: '1287680650063695873'
    }
  }
}
</script>
```

## r-upload - props

- 本组件是基于 element 的 e-table 封装。所以除了部分属性外其他的属性使用方法参考 `element.e-table`。

| 参数    | 说明                                                   | 类型   | 默认值 | 是否必填 |
| ------- | ------------------------------------------------------ | ------ | ------ | -------- |
| value   | 绑定文件业务 id 列表`businessId`                       | String | -      | 是       |
| preview | 下载模式, 图片可以查看，附件只能下载，不可上传和删除。 | boolen | false  | 否       |
| isImg   | 是否是图片类型                                         | boolen | false  | 否       |

## 一些额外的参数可以参考 element-UI 的 upload
