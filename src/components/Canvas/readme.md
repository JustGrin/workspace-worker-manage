
---
title: Canvas 
subtitle: 显示组件
cols: 1
order: 15
author: 李道鹏
---
 
## 何时使用
当要使用`canvas`绘制图形时使用。在 generater 文件夹内封装好绘制函数,以便以后使用。

## 代码演示

```js
import React from 'react';
import Canvas from '@/components/Canvas';
import styles from './style.less';


const Index = () => {
    
    return <div className={styles['container']}>
        <Canvas className={styles['background-canvas']} />
    </div>
}

export default UserLayout;

```

## api

| 参数  | 说明 | 类型 | 默认值 |
| ------        | ------ | ------ | ------ |
| className        | 样式 | Object | - |
| type | canvas图形生成器类型 | String | dottedLine |

