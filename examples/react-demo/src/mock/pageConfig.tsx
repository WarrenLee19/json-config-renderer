import React from "react";
import { DeptData } from "./apiMockData";
import { TPaginationPosition } from "cloud-flow";
import {Modal, notification, Tag, Tooltip} from "apusic-ui";
import { ActionType } from "cloud-flow";

const resColumns = [
    {
        title: '主机名称',
        key: 'resourceName',
    },
    {
        title: 'IP地址',
        key: 'ip',
    },
    {
        title: '操作系统',
        key: 'os',
    },
    {
        title: '内存(G)',
        key: 'memorySize',
    },
    {
        title: '磁盘(G)',
        key: 'diskSize',
    },
];

const tableColumns = [
    {
        title: '主机名称',
        key: 'resourceName',
        filters: [
            { text: 'nginx', value: 'nginx' },
            { text: 'server', value: 'server' },
        ],
        onFilter: (value:string, record:any) => record.resourceName.includes(value),
        sorter: (a:any, b:any) => a.resourceName.length - b.resourceName.length,
        ellipsis: true,
    },
    {
        title: 'IP地址',
        key: 'ip',
        align: "center",
    },
    {
        title: '操作系统',
        key: 'os',
        align: "center",
    },
    {
        title: '运行状态',
        key: 'status',
        align: "center",
        status: true,
        // status:{
        //     start:{color:"#28D255",title:"运行"},
        //     stop:{color:"#E40000",title:"停止"},
        //     exception:{color:"#df7489",title:"异常"},
        //     offline:{color:"#999999",title:"离线"},
        // },
    },
    {
        title: '内存(G)',
        key: 'memorySize',
        align: "center",
        editable: true,
        sorter: (a:any, b:any) => a.memorySize - b.memorySize,
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        width: 200,
        render: (tags: any) => (
            <span>
                {tags.map((tag: any) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag} style={{fontSize:'12px'}}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </span>
        ),
    },
    {
        title: '描述',
        key: 'resourceDescription',
        width: 300,
        ellipsis: {
            showTitle: false,
        },
        render: (text:any) =>{
            return (
                <Tooltip placement="topLeft" title={text}>
                    {text}
                </Tooltip>
            )}
    },
];

const formData = {
    type: "form",
    className: "resource-form-container",
    api: "/mocks/response.json",
    initApi: {
        url: "/mocks/form1.json",
            callback: (result: any, form: any) => {
            console.log(result);
            return result;
        }
    },
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
            visible: '{a} =1&&{b}=1',
        },
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
            "label": "测试版本",
            "rules": [{
                required: true,
                message: '版本不能为空',
            }],
            placeholder: '请输入版本',
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
            "type": "input",
            "name": "address1",
            "label": "服务",
            "rules": [],
            placeholder: '请输入服务地址1',
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
        },
        {
            "type": "input-number",
            "name": "d1",
            "label": "单独1",
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
        },
        {
            "type": "time-picker",
            "name": "time-picker",
            "label": "时间",
            "rules": [{
                required: true,
                message: '必填项不能为空',
            }],
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
        },
        {
            "type": "range-picker",
            "name": "range-picker",
            "label": "日期",
            "rules": [{
                required: true,
                message: '必填项不能为空',
            }],
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
        },
        {
            type: "button",
            name: "button",
            label: "按钮",
        },
        {
            type: "tree-select",
            name: "tree-select",
            label: "系统",
            treeData: [
                { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] }
            ]
        },
        {
            type: "textarea",
            name: "textarea",
            label: "小小文本",
            rows: 5
        },
    ],
    actions: [
        {
            "type": "submit",
            "label": "提交",
            callback: (values: any) => {notification.open({
                message: '表单数据',
                description: JSON.stringify(values)
            })}
        },
        {
            "type": "action",
            "actionType": "dialog",
            "label": "登录须知",
            "dialog": {
                "title": "登录须知",
                "body": "登录须知",
            }
        },
        {
            "type": "button",
            "label": "取消",
            callback: () => {}
        }
    ],
    width: 850,
    debug: true
}

const pageDataSource = [
    {
        key: "user",
        title:'用户管理',
        subTitle:'This is a subtitle',
        type:'page',
        header: {
            breadcrumb: true,
            bulkActions: [
                { key:'update',text:'版本升级',type:'modal',styleType:'primary', modalWidth:650,actionType:'add',
                    body: {
                        title: "版本升级",
                        name: "sample-update",
                        body: {
                            api: '/api/update?idx=${idx}',
                            type: 'form',
                            layout: "horizontal",
                            body: [
                                {
                                    type: "inputNumber",
                                    name:"business",
                                    label:"业务号",
                                    style:{width:'390px'},
                                },
                                {
                                    type: "select",
                                    source:'/api/queryVersion?type=${business}',
                                    name:"version",
                                    label:"版本",
                                    rules:[{ required: true, message: '请选择生效版本!' }]
                                },{
                                    type: "select",
                                    name:"options",
                                    label:"选项",
                                    source: {
                                        method: "get",
                                        url: "/api/get/xxx",
                                        responseData: {
                                            options: "${items|pick:label~name,value~id}" //数据格式映射
                                        }
                                    }
                                }
                            ]
                        }
                    },
                },
                { key:'delete',title:'删除',
                    type:'confirm',
                    confirmTitle:'删除提示',
                    confirmContent:'确定删除选择项nginx实例',
                    api:'/api/delete/${ids}',
                },
            ],
            searchForm: [
                {
                    key:'status',
                    title:'状态',
                    type:'select',
                    placeholder:"请选择状态信息",
                    rules:{ required:true },
                    options:[
                        {
                            label: "全部",
                            value: ""
                        },
                        {
                            label: "运行",
                            value: "start"
                        },
                        {
                            label: "停止",
                            value: "stop"
                        },
                        {
                            label: "异常",
                            value: "exception"
                        },
                        {
                            label: "离线",
                            value: "offline"
                        },
                    ],
                },
                {
                    key:'keyword',
                    title:'模糊查询',
                    type:'InputSearch',
                    placeholder:"输入事件IP/名称查询",
                    rules:{required:false,},
                }
            ],
        },
    },
    {
        key: "TABLE",
        title:'TABLE',
        subTitle:'This is a subtitle',
        type:'page',
        header:{
            breadcrumb: false,
        },
        body:{
            type: 'TABLE',
            api:'https://proapi.azurewebsites.net/doc/getAvatarList?filename=components/table/index.zh-CN.md&owner=ant-design&repo=ant-design',
            columns: [
                {
                    title: '名称',
                    key: 'username',
                },
                {
                    title: '地址',
                    key: 'url',
                },
            ],
            rowKey: 'username',
            actions: null,
            pagination: null,
            // pagination: {
            //     position: TPaginationPosition.topRight,
            //     pageSize: 15
            // },
            bordered:true,
            checkbox:false,
            // dataSource:[...DeptData]
        }
    },{
        key: "TABLES",
        title:'TABLES',
        subTitle:'This is a subtitle',
        type:'page',
        body:[
            {
                type: 'TABLE',
                title: "资源列表",
                // api:'/page',
                // rowKey: 'resourceName',
                columns: resColumns,
                actions: [
                    { key:'monitoring',text:'监控', type: ActionType.custom, callback: (keys:any,values: any)=>{
                            Modal.warn({title:'自定义操作',content:"監控"});
                            console.log('=監控=',keys,values);
                        } },
                ],
                pagination: {
                    position: TPaginationPosition.bottomRight,
                },
                bordered:false,
                checkbox:true,
                dataSource:[DeptData[0],DeptData[1]]
            },
            {
                type: 'TABLE',
                title:'主机信息',
                // api:'/page',
                columns: tableColumns,
                pagination: {
                    position: TPaginationPosition.topLeft,
                    pageSize: 11,
                },
                bordered:false,
                checkbox:true,
                dataSource:[...DeptData]
            }
        ]
    },
]


export default pageDataSource;
