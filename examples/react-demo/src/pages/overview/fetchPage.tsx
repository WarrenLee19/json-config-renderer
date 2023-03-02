import {Modal} from "apusic-ui";
import {ActionType, Types} from "cloud-flow";
import formData from "./form";
import React from "react";
import axios from "axios";

//产品
export const productSource = [
    {value:2,label:'Nginx',key:'nginx'},
    {value:1,label:'Redis',key:'redis'},
    // {value:'AAS',label:'AAS'},
]

//CPU架构
export const osArchSource = [
    {value:'X86',label:'X86'},
    {value:'X86_64',label:'X86_64'},
    {value:'ARM64',label:'ARM64'},
    {value:'MISP64',label:'MIPS64'},
]

//操作系统
export const osTypeSource = [
    {value:'UBUNTU',label:'Ubuntu'},
    {value:'CENTOS',label:'CentOS'},
    {value:'Linux',label:'Linux'},
    {value:'UOS',label:'统信'},
    {value:'REDOS',label:'红旗'},
    {value:'KYLIN',label:'中科麒麟'},
    {value:'NFSOS',label:'中科方德'},
]

async function getDataSource() {
    try {
        const response = await axios({
            url: "https://proapi.azurewebsites.net/doc/getAvatarList?filename=components/table/index.zh-CN.md&owner=ant-design&repo=ant-design",
            method: "get"
        })
        console.log('==getDataSource==',response);
        if(response.status === 200) {
            return {
                status: 1,
                data: response.data
            }
        }
        return {
            status: 0,
            msg: response.data?.message
        }
    } catch(error) {
        return {
            status: 0
        }
    }
}

const fetchTable = {
    url: 'https://proapi.azurewebsites.net/doc/getAvatarList?filename=components/table/index.zh-CN.md&owner=ant-design&repo=ant-design',
    method: 'GET',
    headers: {
        // token:'123'
    },
    data: {},
    callback: (result: any) => {}
}

const fetchDelete = {
    url: 'https://proapi.azurewebsites.net/doc/getAvatarList?filename=components/table/index.zh-CN.md&owner=ant-design&repo=ant-design',
    method: 'delete',
    headers: {
        token:'123'
    },
    data: {},
    callback: (result: any) => {}
}

const table_Columns = [
        {
            title: '用户名称',
            key: 'username',
            filters: [
                { text: 'nginx', value: 'nginx' },
                { text: 'server', value: 'server' },
            ],
            onFilter: (value:string, record:any) => record.resourceName.includes(value),
            sorter: (a:any, b:any) => a.userName.length - b.userName.length,
            ellipsis: true,
        },
        {
            title: 'IP地址',
            key: 'url',
            align: "center",
            ellipsis: true,
        }
    ]
const form_items = [
    {
        type: "input",
        name: "userName",
        label: "用户名",
        placeholder: '请输入用户名',
    },
    {
        type: "input",
        name: "url",
        label: "IP地址",
        placeholder: '请输入IP地址',
    },
]
const searchForm = {
    items:[
        {
            formItemProps:{
                name:"productId" ,
                label:"产品类别"
            } ,
            type:"SELECT",
            selectPayload: productSource
        },
        {
            formItemProps:{
                name:"productVersionNum" ,
                label:"版本"
            } ,
            type:"INPUT",
        },
        {
            formItemProps:{
                name:"status" ,
                label:"状态"
            } ,
            type:"SELECT",
            selectPayload: [
                {value:0,label:'启用'},
                {value:1,label:'禁用'},
            ]
        },
        {
            formItemProps:{
                name:"arch" ,
                label:"CPU架构"
            } ,
            type:"SELECT",
            selectPayload: osArchSource
        },
        {
            formItemProps:{
                name:"osType" ,
                label:"操作系统"
            } ,
            type:"SELECT",
            selectPayload: osTypeSource
        },
    ],

}

const DataSource =
    {
        key: "fetchPage",
        title:'请求',
        subTitle:'This is a subtitle',
        type:'page',
        // initApi:'https://proapi.azurewebsites.net/doc/getAvatarList?filename=components/table/index.zh-CN.md&owner=ant-design&repo=ant-design',
        // initApi: getDataSource,
        header:{
            extraRight: "default",
            breadcrumb: false,
            bulkActions: [
                {
                    key: 'add', text: '版本新增', type: ActionType.add, showType: 'primary', enable: true, modalWidth: 650,
                    title:'资源新增',body: {...formData,actions:null},api:'/add',massageContent: '资源新增成功'
                },
                {
                    key: 'setting', text: '设置', type: [
                        {type: Types.confirm,title:'重置提示', content:'是否确定重置',},
                        {type: Types.ajax, api:'/setting',},
                        {type: Types.notification,title:'成功', content:'重置完成',},
                    ],
                },
                {
                    key: 'delete', text: '删除',
                    type: ActionType.confirm,
                    title: '删除提示',
                    content: '确定删除选择项信息',
                    api: fetchDelete,// "api/delete/${ids}",
                    messageContent: '删除成功'
                },
                {
                    key: 'yuque', text: 'react-json-renderer', type: ActionType.openNewWindow,enable: true, url: 'https://github.com/WarrenLee19/react-json-renderer'
                },
                { key: 'soft', text: '软件定义', type: ActionType.openNewWindow, enable: true, url: '/platform/resourceDetail'},
            ],
            search: searchForm,
        },
        body:[
            {
                type: 'table',
                rowKey:"index",
                columns: table_Columns,
                // api: 'https://proapi.azurewebsites.net/doc/getAvatarList?filename=components/table/index.zh-CN.md&owner=ant-design&repo=ant-design',
                api: fetchTable,
                actions: [
                    {
                        key: 'detail', text: '详情', title: '资源详情', type: ActionType.detail, showType: "link", modalWidth: 600,
                        initApi:'/cloud-flow/detail',
                        body: {
                            type:  'form',
                            body: form_items,
                            width: '320',
                            bordered:false,
                        },
                    },
                    {
                        key: 'edit', text: '编辑', type: ActionType.edit, showType: "link", enable: true, modalWidth: 650,
                        initApi:'/detail',
                        api:'/edit',
                        title:'资源数据更新',body: {
                            type:  'form',
                            body: form_items,
                            width: '320',
                            action:null
                        },massageContent: '资源更新成功'
                    },
                    { key:'monitoring',text:'监控', type: ActionType.custom,showType: "link", callback: (keys:any,values: any)=>{
                            Modal.warn({title:'自定义操作',content:"監控"});
                            console.log('=監控=',keys,values);
                        } },
                    { key: 'url', text: '路径', type: ActionType.openNewWindow, showType: "link", url: '/platform/resourceDetail'},
                ],
                pagination: {
                    pageSize: 8,
                },
                bordered:true,
                // dataSource:[...DeptData]
            }
        ]
    };

export default DataSource;
