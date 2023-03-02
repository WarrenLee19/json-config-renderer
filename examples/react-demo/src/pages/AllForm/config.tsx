import {Button, notification, Form as FormComp, Input} from "apusic-ui";

const Form = {
    type: "form",
    className: "write-form-container",
    api: "/mocks/response.json",
    initApi: "/mocks/form1.json",
    columnCount: 1,
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
            disabled: true,
            placeholder: '请输入服务名称',
        },
        {
            type: "select",
            name: "app",
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
        },
        {
            "type": "input",
            "name": "address",
            "label": "服务地址",
            "rules": [],
            placeholder: '请输入服务地址',
        },
        {
            "type": "input",
            "name": "version1",
            "label": "版本1",
            placeholder: '请输入版本1',
        },
        {
          type: 'group',
          body: [
              {
                  "type": "input",
                  "name": "address1",
                  "label": "服务2",
                  "rules": [],
                  placeholder: '请输入服务地址1',
              },
              {
                  type: "input",
                  name: "managePort",
                  label: "管理端口",
                  rules: [],
                  placeholder: '请输入管理端口',
              },
          ]
        },
        {
            "type": "input",
            "name": "no1",
            "label": "不填1",
        },
        {
            "type": "input",
            "name": "no2",
            "label": "不填2",
        },
        {
            "type": "checkbox",
            "name": "no3",
            "label": "不填3",
            options: [
                { label: 'Apple', value: 'Apple', disabled: true },
                { label: 'Pear', value: 'Pear' },
                { label: 'Orange', value: 'Orange' },
            ],
            span: 1
        },
        {
            "type": "input-number",
            "name": "d1",
            "label": "单独1",
            span: 1
        },
        {
            "type": "switch",
            "name": "d2",
            "label": "单独2",
            rules: [
                {
                    required: true,
                    message: '111'
                }
            ],
            span: 1
        },
        {
            "type": "input",
            "name": "d3",
            "label": "单独3",
            span: 1
        },
        {
            "type": "input-password",
            "name": "d4",
            "label": "必填4",
            "rules": [{
                required: true,
                message: '必填项不能为空',
            }],
            span: 1
        },
        {
            "type": "rate",
            "name": "rate",
            "label": "评分",
            "rules": [{
                required: true,
                message: '必填项不能为空',
            }],
            span: 1
        },
        {
            "type": "slider",
            "name": "slider",
            "label": "温度",
            "rules": [{
                required: true,
                message: '必填项不能为空',
            }],
            span: 2
        },
        {
            "type": "time-picker",
            "name": "time-picker",
            "label": "时间",
            "rules": [{
                required: true,
                message: '必填项不能为空',
            }],
            span: 1
        },
        {
            "type": "date-picker",
            "name": "date-picker",
            "label": "日期",
            "rules": [{
                required: true,
                message: '必填项不能为空',
            }],
            showTime: true,
            span: 2
        },
        {
            "type": "range-picker",
            "name": "range-picker",
            "label": "日期",
            "rules": [{
                required: true,
                message: '必填项不能为空',
            }],
            span: 4
        },
        {
            "type": "radio-group",
            "name": "radio-group",
            "label": "布局",
            "rules": [{
                required: true,
                message: '必填项不能为空',
            }],
            options: ['水平', '垂直', '内联'],
            span: 4
        },
        {
            type: "button",
            name: "button",
            label: "按钮",
            span: 2
        },
        {
            type: "tree-select",
            name: "tree-select",
            label: "系统",
            span: 2,
            treeData: [
                { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] }
            ]
        },
        {
            type: "textarea",
            name: "textarea",
            label: "小小文本",
            span: 3,
            rows: 5
        },
        {
            type: 'group',
            body: [
                {
                    "type": "input",
                    "name": "group1",
                    "label": "group1",
                },
                {
                    "type": "input",
                    "name": "group2",
                    "label": "group2",
                },
                {
                    "type": "input",
                    "name": "group3",
                    "label": "group3",
                },
            ]
        },
        {
            type: 'group',
            body: [
                {
                    "type": "input",
                    "name": "group1",
                    "label": "group1",
                },
                {
                    "type": "input",
                    "name": "group2",
                    "label": "group2",
                },
            ]
        },
        {
            type: 'group',
            body: [
                {
                    "type": "input",
                    "name": "1",
                    "label": "一",
                    "rules": [{
                        required: true,
                        message: '版本不能为空',
                    }],
                },
                {
                    "type": "input",
                    "name": "2",
                    "label": "二",
                    "rules": [{
                        required: true,
                        message: '版本不能为空',
                    }],
                },
                {
                    "type": "input",
                    "name": "3",
                    "label": "三",
                    "rules": [{
                        required: true,
                        message: '版本不能为空',
                    }],
                },
                {
                    "type": "button",
                    "name": "4",
                    "label": "四",
                    "rules": [{
                        required: true,
                        message: '版本不能为空',
                    }],
                },
            ]
        },
        {
            "type": "custom",
            "name": "4",
            render: function() {
                return (<FormComp.Item label={'自定义render:'}><Input/></FormComp.Item>)
            }
        },
    ],
    actions: [
        {
            "type": "custom",
            "label": "提交",
            callback: (values: any) => {notification.open({
                message: '表单数据',
                description: JSON.stringify(values)
            })}
        },
        {
            "type": "action",
            // "actionType": {
            //     'add'
            // },

        },
        {
            "type": "button",
            "label": "取消",
            callback: () => {}
        }
    ],
    debug: true
};

const action = {
    showType: 'sAdd',
    body: {

    }
};

const DataSource = {
    key: "write-demo",
    title: '投稿',
    type: 'page',
    header: {
        breadcrumb: true,
    },
    body: {
        ...Form
    }
};

export default DataSource;
