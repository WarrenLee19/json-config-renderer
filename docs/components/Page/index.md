---
category: Components
type: 布局
title: Page
subtitle: 页面
cols: 1
---

Page 组件是JSON 配置中顶级容器组件，是整个页面配置的入口组件。

### page页面组成
Page 默认将页面分为几个区域，分别是**页头（header）部分、内容区（body）**和**侧边栏（aside）**，你可以在这些区域配置你想要的组件和内容。

### 基本用法
我们这里在内容区中简单渲染。
{
key: "fans",
title:'粉丝中心',
type:'page',
header:{
breadcrumb: false,
},
aside: {
title: "侧边栏"
},
body:"内容区"
}
渲染效果
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26312226/1649639211856-771ec51b-694c-4139-83aa-64a91a0da16e.png#clientId=u83f7be14-c130-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=567&id=u7b17ceb5&margin=%5Bobject%20Object%5D&name=image.png&originHeight=567&originWidth=1355&originalType=binary&ratio=1&rotation=0&showTitle=false&size=6929&status=done&style=none&taskId=u2be9e00b-fc48-40cb-babe-d7da432ca83&title=&width=1355)

### 区域渲染其他组件效果
initApi: 通过配置initApi，可以在初始化页面时请求所配置的接口。
header: 页头配置（包括面包屑、批操作、搜索区域）
aside: 侧边栏配置 （标题、宽度、其他渲染组件）
body: 内容区配置 （其他渲染组件）
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26312226/1649639983134-7da60e1f-b78e-4d0e-84ea-b218b59ce731.png#clientId=u83f7be14-c130-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=606&id=uf62a847f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=606&originWidth=990&originalType=binary&ratio=1&rotation=0&showTitle=false&size=51520&status=done&style=none&taskId=u80c06b20-09f5-4a95-83ec-0366c698c7a&title=&width=990)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26312226/1649639732725-976fa17a-94a2-41f9-bf71-015990d8ba0e.png#clientId=u83f7be14-c130-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=886&id=uffd7d599&margin=%5Bobject%20Object%5D&name=image.png&originHeight=886&originWidth=1359&originalType=binary&ratio=1&rotation=0&showTitle=false&size=50134&status=done&style=none&taskId=u0d7f77a4-a202-405f-adb5-37cb0aadfdd&title=&width=1359)

### API
page

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type |  指定Page 组件 | string | "page" |
| key | page组件键值 | string |  |
| title | 页面标题 | string |  |
| subTitle | 页面副标题 | string |  |
| initApi | 初始化页面时请求信息 | string &#124; Promise |  |
| api | 请求page数据 | string &#124; Promise |  |
| style | 样式配置 | object |  |
| header | 页头容，内容主要包括面包屑、批操作、搜索区域，详情见下方说明。 | object |  |
| aside | 侧边栏 ，内容主要是标题、宽度、其他渲染组件 | object |  |
| body | 内容区，渲染其他组件 | string &#124; number &#124; Onject &#124; Array |  |
|  dataSource   |  静态资源数据可以整个 page 级别使用。   | Array &#124; object |  |

header

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| breadcrumb | 面包屑 | boolean &#124; Array | false |
| bulkActions | 批量操作区 | Array |  |
| searchForm | 搜索区 | Array |  |


