import {Form as FormComp, Input} from "apusic-ui";
import {ActionType} from "cloud-flow";

const Form = {
    type: "form111",
    className: "artwork-form-container",
    api: "/mocks/response.json",
    initApi: {
        url: "/mocks/form1.json",
        callback: (result: any, form: any) => {
            return result;
        }
    },
    columnCount: 1,
    labelConfig: {
      width: 160
    },
    body: [
        {
          type: 'group',
          body: [
              {
                  "type": "input",
                  "name": "address1",
                  "label": "服务",
                  "rules": [],
                  placeholder: '请输入服务地址1',
                  initialValue: '默认地址已填入',
              },
              {
                  type: "input",
                  name: "managePort",
                  label: "管理端口",
                  rules: [
                      {
                          required: true,
                          message: '端口不能为空',
                      },
                      {
                          pattern: /^(\d|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/i,
                          message: '端口范围0-65535',
                      }
                  ],
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
                    "label": "ABCDEFGHIJKLMNOP",
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
                    "type": "input",
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
            "name": "custom",
            render: function() {
                return (<FormComp.Item label={'自定义render:'}><Input/></FormComp.Item>)
            }
        },
        {
            "type": "upload",
            "name": "upload",
            "label": "文件上传",
        },
    ],
    actions: [
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
        },
        {
            "type": "button",
            "action": [
                {
                    key: 'cancel',
                    text: '取消',
                    type: ActionType.openNewWindow,
                    showType: 'link',
                    url: 'https://zhihu.com',
                }
            ]
        }
    ],
    watchers: [
        {
            src: 'address1',
            des: 'managePort',
            config: {
                operator: '=',
                value: '80',
                properties: {
                    disabled: true,
                    value: '被disable了诶'
                }
            }
        }
    ],
    debug: true
};

const DataSource = {
    key: "write-demo",
    title: '简单表单',
    type: 'page',
    header: {
        breadcrumb: true,
    },
    body: {
        ...Form
    }
};

export default DataSource;
