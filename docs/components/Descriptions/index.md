---
category: Components
type: 组件
title: Descriptions
subtitle: 
cols: 1
---

成组展示多个只读字段。

## 变更记录
| **版本号** | **作者** | **修订内容** | **发布日期** |
| --- | --- | --- | --- |
| 1.0 | 李迪珀 | Descriptions | 2022-05-17 |


## 何时使用

常见于详情页的信息展示。

## API

```jsx
<Card title="卡片标题">卡片内容</Card>
```
## 基本用法
![image.png](https://img.apusic.com/volume1/4,f79b13ca5c)
渲染效果
![image.png](https://img.apusic.com/volume1/6,f8a861415c)



| 参数 | 说明 | 类型 | 默认值 |  |
| --- | --- | --- | --- | --- |
| type | descriptions组件 | string | "descriptions" |
| bordered | 是否展示边框 | boolean | false |  |
| initApi | 初始化数据列表， 用来请求数据的 api   | string &#124; object |  |
| toolTip | 鼠标移上是否显示toolTip | boolean | false |  |
| rowKey | 可展示的key,为Object时可以重命名key | `Array` or `Object`| - |  |
| colon | 配置 `Descriptions.Item` 的 `colon` 的默认值 | boolean | true |  |
| column | 一行的 `DescriptionItems` 数量，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | number | 3 |  |
| contentStyle | 自定义内容样式 | CSSProperties | - | 
| extra | 描述列表的操作区域，显示在右上方 | ReactNode | - | 
| labelStyle | 自定义标签样式 | CSSProperties | - | 
| layout | 描述布局 | `horizontal` or `vertical` | `horizontal` |  |
| size | 设置列表的大小。可以设置为 `middle` 、`small`, 或不填（只有设置 `bordered={true}` 生效） | `default` or`middle` or `small` | - |  
| title | 描述列表的标题，显示在最顶部 | ReactNode | - |
| body.contentStyle | 内容子项自定义内容样式 | CSSProperties | -      | 
| body.label        | 内容子项的描述     | ReactNode     | -      |      
| body.labelStyle   | 内容子项自定义标签样式 | CSSProperties | -      | 
| body.span         | 内容子项包含列的数量   | number        | 1      |     