category: Components
cols: 1
type: Data Display
title: Table
subtitle: 表格

---

展示行列数据。

## 何时使用

- 当有大量结构化的数据需要展现时；
- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。

## 如何使用

为表格提供一个 本地数据 `sourcedata` 或 远程数据链接 `url` 。

```vue
<template>
  <!-- 远程数据 -->
  <Rtable :url="url" :conditions="conditions" :columns="columns">
    <template v-slot:custemSlot="scope">
      <div>自定义的列,但是 `custemSlot` 要和columns里的`slotName`对应 </div>
      <span> scope 是父组件插槽提供的数据 </sapn>
    </template>
  </Rtable>
    <!-- 本地数据数据 -->
  <Rtable :sourcedata="sourcedata"  :columns="columns">
    <template v-slot:custemSlot="scope">
      <div>自定义的列,但是 `custemSlot` 要和columns里的`slotName`对应 </div>
      <span> scope 是父组件插槽提供的数据 </sapn>
    </template>
  </Rtable>
</template>

<script>
import Rtable from '@/components/r-table'
import url from '@/api/url' // userGetPage

export default {
  components: {
    Rtable
  },
  data() {
    return {
      url: url.userGetPage,
      columns: [
        {
          label: '用户名',
          prop: 'userName'
        },
        {
          label: '姓名',
          prop: 'realName'
        },
        {
          label: '自定义列',
          prop: 'isenable',
          slotName: 'custemSlot'
        },
        {
          label: '操作列',
          prop: 'isenable',
          operates: [
              {
                el: 'switch',
                prop: 'state',
                props: {
                  // 'active-text': '开',
                  // 'inactive-text': '关'
                  'active-value': 1,
                  'inactive-value': 0
                },
                opEvent(v, row) {
                  // console.log(v, scope)
                  row.state = v
                }
              },
              {
                el: 'button',
                props: {
                  type: 'text'
                },
                text: '编辑',
                opEvent(row) {
                  console.log(row)
                }
              },
              {
                el: 'popconfirm',
                text: '重置',
                props(row) {
                  return {
                    title: `确认重置用户${row.userName}(${row.realName})的密码？`
                  }
                },
                opEvent(row) {
                  console.log(row)
                }
              }
          ]
        }
      ],
      sourcedata: [
          {
            "id": "410000199011090417",
            "code": "2D6eB8e0-e05A-DB24-7d6C-985728f9FaD3",
            "createdBy": "Angela",
            "createdDate": "1972-04-25 00:48:43",
            "updateBy": "Sharon",
            "updateDate": "2009-05-14 06:06:16",
            "state": 1,
            "remark": "立查农油列种型方重部不马无的。",
            "deptCode": null,
            "companyCode": null,
            "companyName": null,
            "telPhone": 182934848992,
            "roleAlias": "客服",
            "roleCode": "Inuq20200420105147",
            "roleName": "service",
            "realName": "杜伟",
            "sex": null,
            "status": "on",
            "userName": "Lisa"
        }
      ],
    }
  },
}
</script>
```

## table - props

- 本组件是基于 element 的 e-table 封装。所以除了部分属性外其他的属性使用方法参考 `element.e-table`。

| 参数           | 说明                                                                                  | 类型               | 默认值 | 是否必填 |
| -------------- | ------------------------------------------------------------------------------------- | ------------------ | ------ | -------- |
| url            | 获取远端数据的接口地址                                                                | String             | -      | 否       |
| sourcedata     | 本地数据 当存在该参数时，`url`无效                                                    | object             | -      | 否       |
| conditions     | 表数据查询条件，改变会触发刷新                                                        | object             | {}     | 否       |
| size           | 每页的数据条数                                                                        | number             | 10     | 否       |
| columns        | 表格列的配置描述，具体项见下表                                                        | array              | []     | 是       |
| getResponse    | 由父组件传入，获取接口返回数据                                                        | Function(respsont) | -      | 否       |
| invariant      | 表数据查询固定条件，改变不会触发刷新                                                  | object             | {}     | 否       |
| rowKey         | 表格行 key 的取值，可以是字符串或一个函数                                             | string             | 'id'   | 否       |
| formatParam    | 格式请求参数: 接口参差不齐，前端为了规范请求参数，使用该参数                          | Function(param)    | -      | 否       |
| pagination     | 分页器参数, 当为`false`时 不显示分页器且`pageSize`默认值为 500                        | [Object, Boolean]  | {}     | 否       |
| colByData      | 是否自动根据数据里的`headers`生成 `columns`                                           | Boolean            | false  | 否       |
| headLineHeight | 表头的高度 (由于界面要求在数据不满时也要撑开表格内容故有设置高度用于计算)             | Number             | 40     | 否       |
| lineHeight     | 行高(同上)                                                                            | Number             | 41     | 否       |
| height         | 表的高度，当设置 `height`时,直接使用这个高度, `headLineHeight`和 `lineHeight`会被忽略 | Number             | -      | 否       |

## table -> columns

- 除了部分属性外其他的属性使用方法参考 `element.e-table.columns`。

| 参数     | 说明                                                   | 类型   | 默认值 | 是否必填 |
| -------- | ------------------------------------------------------ | ------ | ------ | -------- |
| label    | 表头的名称                                             | string | -      | 是       |
| prop     | 列对应的字段                                           | string | -      | 否       |
| slotName | 插槽名称, 如果不为空的话会使用对应插槽内容             | string | -      | 否       |
| operates | 操作列,可通过配置生成对应的操作如 button,popconfirm 等 | array  | []     | 否       |

## table -> columns -> operates

| 参数    | 说明                                                                                            | 类型            | 默认值 | 是否必填 |
| ------- | ----------------------------------------------------------------------------------------------- | --------------- | ------ | -------- |
| el      | 操作元素, 可选内容 `button|popconfirm|switch`                                                   | string          | button | 是       |
| text    | 按钮或者操作的文字内容                                                                          | string          | -      | 是       |
| props   | 操作的属性, 可以直接使用对象也可使用函数处理后返回(注:必须返回正确的对象哦)`props(row, $index)` | Object/Function | -      | 否       |
| opEvent | 操作触发的事件                                                                                  | Function        | []     | 是       |

### operates 组件的一些区别

- popconfirm | button
  opEvent 参数: `row, $index, $event` , `$event` 是事件对象
- switch
  opEvent 参数: `$event, row, $index`, `$event` 即是 `value`
