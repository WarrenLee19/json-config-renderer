import {Modal} from "apusic-ui";
import {TPaginationPosition} from "cloud-flow";
import {resColumns, tableColumns} from "./tableColumns";
import {ActionType, Types} from "cloud-flow";
import formData from "./form";
import { EyeOutlined,EditOutlined, CustomerServiceOutlined, ApiOutlined,BranchesOutlined } from '@ant-design/icons'
import React from "react";

const DataSource =

    {
        key: "overview",
        title:'概览',
        subTitle:'This is a subtitle',
        type:'page',
        // initApi:'https://proapi.azurewebsites.net/doc/getAvatarList?filename=components/table/index.zh-CN.md&owner=ant-design&repo=ant-design',
        header:{
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
                    api: "api/delete/${ids}",
                    messageContent: '删除成功'
                },
                {
                    key: 'yuque', text: 'react-json-renderer', type: ActionType.openNewWindow,enable: true, url: 'https://github.com/WarrenLee19/react-json-renderer'
                },
            ],
        },
        body:[
            {
                type: 'table',
                columns: tableColumns,
                actions: [
                    {
                        key: 'detail', text: '详情', title: '资源详情', type: ActionType.add, showType: <EyeOutlined />, modalWidth: 1000,
                        body: {
                            type: 'table',
                            // api:'/page',
                            columns: resColumns,
                            pagination: {
                                position: TPaginationPosition.bottomRight,
                            },
                            dataSource: [],
                            bordered:false,
                        },
                    },
                    {
                        key: 'edit', text: '编辑', type: ActionType.edit, showType: <EditOutlined />, enable: true, modalWidth: 650,
                        initApi:'/detail',
                        title:'资源数据更新',body: {...formData,action:null},api:'/edit',massageContent: '资源更新成功'
                    },
                    { key:'monitoring',text:'监控', type: ActionType.custom,showType: <CustomerServiceOutlined />, callback: (keys:any,values: any)=>{
                            Modal.warn({title:'自定义操作',content:"監控"});
                            console.log('=監控=',keys,values);
                        } },
                    {
                        key: 'yuque', text: 'react-json-renderer', type: ActionType.openNewWindow, showType: <ApiOutlined />,
                        url: 'https://github.com/WarrenLee19/react-json-renderer',
                    },
                    { key: 'url', text: '路径', type: ActionType.openNewWindow, showType: <BranchesOutlined />, url: '/platform/resourceDetail'},
                ],
                // pagination: null,//默认分页信息右下角 、无分页信息
                // pagination: {
                //     position: TPaginationPosition.topLeft,
                //     pageSize: 10,
                // },
                bordered:false,
                dataSource:[]
            }
        ]
    };

export default DataSource;
