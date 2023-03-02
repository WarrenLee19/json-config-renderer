import { TPaginationPosition } from "cloud-flow";
import { resColumns, tableColumns } from "./tableColumns";
import formData from "./form";
import {ActionType} from "cloud-flow";
import {Modal,Progress} from "apusic-ui";
import {FC, ReactNode} from "react";

const detail = {
    key: "resourceDetail",
    title: '资源详情',
    type: 'page',
    header: {
        title: false,
        breadcrumb: [
            // {path:'',label:'创作中心',},
            {path:'/platform/resource',label:'资源管理',},
        ],
    },
    body:[
        {...formData,actions: null},
        {
            type: 'descriptions',
            initApi: {
                url: "/mocks/form1.json",
                callback: (result: any) => {
                    console.log(result);
                    const PortManage:FC<ReactNode> = ()=> <><div style={{paddingLeft:'15px',width:'60%'}}>{<Progress percent={result.managePort} />}</div></>;
                    // @ts-ignore
                    return {...result,managePort:<PortManage/> };
                }
            },
            rowKey:{'app':'项目','address':'地址','managePort':'发布进度','serviceName':'服务名称'},
            toolTip:true,
            column:3,
            title: '资源详情',
            bordered:false,
        },
        {
            type: 'table',
            title: "资源列表",
            api:'/page',
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
            checkbox:false,
            // dataSource:[...DeptData]
        },
        {
            type: 'table',
            title:'主机信息',
            api:'/page',
            columns: tableColumns,
            actions: [
                {
                    key: 'yuque', text: 'react-json-renderer', type: ActionType.openNewWindow, showType: 'link',
                    url: 'https://github.com/WarrenLee19/react-json-renderer',
                },
            ],
            pagination: {
                position: TPaginationPosition.bottomRight,
            },
            bordered:false,
            checkbox:false,
            dataSource:[]
        }
    ]
}

export default detail;
