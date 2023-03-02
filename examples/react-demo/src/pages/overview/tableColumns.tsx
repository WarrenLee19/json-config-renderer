import React from "react";
import {Tag, Tooltip} from "apusic-ui";
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
        width: 150,
        onFilter: (value:string, record:any) => record.resourceName.includes(value),
        sorter: (a:any, b:any) => a.resourceName.length - b.resourceName.length,
        ellipsis: true,
    },
    {
        title: 'IP地址',
        key: 'ip',
        align: "center",
        width: 150,
        ellipsis: true,
    },
    {
        title: '操作系统',
        key: 'os',
        align: "center",
        ellipsis: true,
    },
    {
        title: '运行状态',
        key: 'status',
        align: "center",
        status: true,
        ellipsis: true,
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
        width: 150,
        ellipsis: true,
        render: (tags: any) => (
            <span>
                {tags && tags.length>0 && tags.map((tag: any) => {
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
    // {
    //     title: '描述',
    //     key: 'resourceDescription',
    //     width: 300,
    //     ellipsis: {
    //         showTitle: false,
    //     },
    //     render: (text:any) =>{
    //         return (
    //             <Tooltip placement="topLeft" title={text}>
    //             {text}
    //             </Tooltip>
    //     )}
    // },
];


export { resColumns, tableColumns };
