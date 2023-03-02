import { Modal } from 'apusic-ui';
import { resColumns, tableColumns } from "./tableColumns";
import { TPaginationPosition} from "cloud-flow";
import formData from './form';
import { ActionType, Types } from "cloud-flow";

const resource = {
    key: "resource",
    title: '资源管理',
    subTitle: 'This is a subtitle',
    type: 'page',
    header: {
        bulkActions: [
            {
                key: 'add', text: '版本新增', type: ActionType.add, showType: 'primary', enable: true, modalWidth: 650,
                title:'资源新增',body: {...formData,actions:null},api:'/add',massageContent: '资源新增成功'
            },
            {
                key: 'setting', text: '设置', type: [
                    {type: Types.ajax, api:'/setting',},
                    {type: Types.message,title:'提示', content:'确定重置',},
                    // {type: Types.notification,title:'成功', content:'重置完成',},
                    {type: Types.url,title:'成功', url:'http://',},
                ],
            },
            {
                key: 'delete', text: '删除',
                type: ActionType.confirm,
                title: '删除提示',
                content: '确定删除选择项nginx实例信息',
                api: "api/delete/${ids}",
                messageContent: '资源删除成功'
            },
        ],
    },
    aside: {
        // title: '侧边拦',
        width:400,
        // body: formData,
        body:{
            type: 'container',
            body:{...formData,actions: null},
            actionsPosition: 'bottomCenter',
            actions:[
                {
                    key: 'cancle', text: '取消', enable:true, type: [
                        {type: Types.message,title:'提示', content:'确定重置',},
                    ],
                },
                {
                    key: 'save', text: '保存',showType:'primary',enable:true, type: [
                        {type: Types.message,title:'操作提示', content:'是否确定保存表单信息',},
                        {type: Types.ajax, api:'/save',},
                        {type: Types.notification,title:'成功', content:'保存成功',},
                    ],
                },
            ]
        }
    },
    body: {
        type: 'table',
        columns: tableColumns,
        actions: [
            {
                key: 'detail', text: '详情', title: '资源详情', type: ActionType.add, showType: 'link',
                body: {
                    type: 'table',
                    // api:'/page',
                    columns: resColumns,
                    pagination: {
                        position: TPaginationPosition.bottomRight,
                    },
                    bordered:false,
                    dataSource: []
                },
            },
            {
                key: 'edit', text: '编辑', type: ActionType.edit, showType: 'link', enable: true, modalWidth: 650,
                initApi:'/detail',
                title:'资源数据更新',body: {...formData,action:null},api:'/edit',massageContent: '资源更新成功'
            },
            { key:'monitoring',text:'监控', type: ActionType.custom, callback: (keys:any,values: any)=>{
                    Modal.warn({title:'自定义操作',content:"監控主机："+ values.resourceName});
                console.log('=監控=',keys,values);
                } },
            {
                key: 'yuque', text: 'react-json-renderer', type: ActionType.openNewWindow, showType: 'link',
                url: 'https://github.com/WarrenLee19/react-json-rendererr',
            },
            {key: 'url', text: '链接', type: ActionType.openNewWindow, url: '/platform/resourceDetail'},
        ],
        // pagination: null,
        //     {
        //     position: TPaginationPosition.bottomRight,
        // },
        bordered: false,
        dataSource: []
    }
}

export default resource;
