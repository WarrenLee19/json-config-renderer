---
category: Components
type: 展示组件
title: Table
subtitle: 表格
cols: 1
---
表格，支持配置初始化接口初始化数据域，具有配置接口数据域功能的组件。

### 基本用法
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26312226/1649646166372-4ea921e6-b10f-431b-8114-68d38ebe6421.png#clientId=ub9757f51-a0ac-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=247&id=uff624010&margin=%5Bobject%20Object%5D&name=image.png&originHeight=247&originWidth=735&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21728&status=done&style=none&taskId=u502abe3d-e301-49ae-aa69-b57f5b056b8&title=&width=735)
渲染效果
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26312226/1649646199537-20007391-3fa1-448e-82f2-d0cf7528f6a8.png#clientId=ub9757f51-a0ac-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=429&id=uIPgs&margin=%5Bobject%20Object%5D&name=image.png&originHeight=429&originWidth=1290&originalType=binary&ratio=1&rotation=0&showTitle=false&size=26759&status=done&style=none&taskId=u77c27fc5-96fe-46be-80de-48e3b2b51a4&title=&width=1290)
# 

### API
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | table组件 | string | "table" |
| api | 配置接口数据域， 用来请求数据的 api   | string &#124; object |  |
| dataSource |  静态资源数据   | Array |  |
| columns |  表格列的配置描述，支持Apusic UI Table组件的columns所有信息 | [ColumnsType](https://ant-design.gitee.io/components/table-cn/#Column)[] |  |
| actions |  操作列信息，详见Actions上方说明。   | Array |  |
| bordered | 是否展示外边框和列边框 |  |  |
| pagination | 分页器，设为 false 时不展示和进行分页 | Object |  |




