---
category: Components
type: 表单
title: Form
subtitle: 表单
cols: 1
---

## 变更记录
| **版本号** | **作者** | **修订内容** | **发布日期** |
| --- | --- | --- | --- |
| 1.0 | 韩林波 | 动态设计初稿 | 2022-03-22 |



## 1. 背景介绍
### 1.1 业务背景
> 常规的表单独立页面


![简易表单](https://apusic-1251618686.cos.ap-guangzhou.myqcloud.com/simple-form.png)


### 1.2 业务场景
> 嵌入方式的表单设计。

嵌入式表单只保留表单层，外层容器需要拿到表单内部数据。

model内嵌入一个不带操作按钮的表单。但是model相应的操作需要绑定表单实例。


## 2.示例
### 2.1 单列简单表单
```javascript
{
  "type": "page"",
  "body": {
    "type": "form",
    "className": "form-container",  
    "api": "/amis/api/mock2/form/saveForm",
    "initApi": "/amis/api/mock2/form/initData",
    "columnCount": 1,
    "body": [
      {
        "type": "input-text",
        "name": "name",
        "label": "姓名：",
        "rules": [Array<{rule:string;message:string;name?: string[]}>],
        "disabled": false,
      },
      {
        "name": "email",
        "type": "input-email",
        "label": "邮箱：",
        "rules": [],
      }
    ],
      "actions": [
            {
                "type": "button",
                "action": [
                    {
                        key: 'commit',
                        text: '提交',
                        type: ActionType.add,
                        showType: 'link',
                        url: 'https://zhihu.com',
                    }
                ]
            }
    ]
  }
}
```

### 2.2 自定义布局
```javascript
{
    "type": "form",
        className: "write-form-container",
        api: "/mocks/response.json",
        initApi: {
        url: "/mocks/form1.json",
            callback: (result: any, form: any) => {
            console.log(result);
            return result;
        }
    },
    "columnCount": 1,
        body: [
        {
            type: "input-name",
            name: "serviceName",
            label: "服务名称",
            rules: [
                {
                    required: true,
                    message: '服务名称不能为空',
                },
                {
                    max: 10,
                    message: '服务名称不能超过10个字符',
                },
            ],
            disabled: false,
            placeholder: '请输入服务名称',
        },
        {
            type: "select",
            "name": "app",
            "label": "所属应用",
            "rules": [{
                required: true,
                message: '所属应用不能为空',
            }],
            placeholder: '请输入所属应用',
            options: ['测试应用1', '测试应用2', '测试应用3'],
        },
        {
            type: 'group',
            body: [
                {
                    "type": "radio",
                    "name": "protocol",
                    "label": "服务",
                    "rules": [{
                        required: true,
                        message: '服务协议不能为空',
                    }],
                    options: ['HTTPS', 'HTTP', 'HTTP&HTTPS'],
                },
                {
                    "type": "input",
                    "name": "version",
                    "label": "测试版本-测试测试测试测试测试",
                    "rules": [{
                        required: true,
                        message: '版本不能为空',
                    }],
                    placeholder: '请输入版本',
                },
            ]
        }
    ]
}
```

## 3.API
| **属性名**     | **类型**                                             | **默认值** | **说明**         |
|-------------|----------------------------------------------------|---------|----------------|
| type        | string                                             | form    | "form" 指定为 Form 渲染器 |
| name        | string                                             | 随机生成    | 表单命名           |
| labelConfig | Object{width: number}                              |         |          表单label配置项      |
| body        | Array<[表单项]                                      |         | Form 表单项集合     |
| actions     | Array<[行为按钮]                                     |         | Form 提交按钮，成员为 Action |
| rules       | Array<{rule:string;message:string;name?: string[]}> |         | 表单组合校验规则       |
| api         | [API]                                              |         | Form 用来保存数据的 api。 |
| initApi     | [API]                                              |         | Form 用来获取初始数据的 api。 |
| columnCount | number                                             | 1       | 表单项显示为几列。支持1-4列 |
| className   | string                                             | cf-form | 外层 Dom 的类名。    |
| debug       | boolean                                            | false   | 调试模式           |
