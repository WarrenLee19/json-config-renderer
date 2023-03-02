import {
  FileTextOutlined,
  // AppstoreOutlined,
  // ToolOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  MenuUnfoldOutlined,
  BarsOutlined,
  // MenuFoldOutlined,
} from '@ant-design/icons';

const menuConfig = [
  {
    title: '首页',
    path: 'home',
    icon: ContainerOutlined,
  },
  {
    title:'表单案例',
    icon: MenuUnfoldOutlined,
    path: "Menu",
    children:[
      {
        title: '简单表单',
        path: 'simple-form',
        icon: MailOutlined,
      },
      {
        title: '表单组件',
        path: 'all-form',
        icon: MailOutlined,
      },
      {
        title: '字幕管理',
        path: 'text-manage',
        icon: MailOutlined,
      }
    ]
  },
  {
    title: '数据中心',
    path: 'statistic',
    icon: FileTextOutlined,
  },
  {
    title: '粉丝管理',
    path: 'fans',
    icon: PieChartOutlined,
  },
  {
    title:'列表案例',
    path:'lowcode-manage',
    icon: DesktopOutlined,
    permission: "aasc:order:list", // 权限标识
    children:[
      {
        title:'常规列表',
        path:'overview',
      },
      {
        title:'左右布局',
        path: 'resource',
        isControlPage: true,
      },
      {
        title:'TABLE',
        path: 'TABLE',
        isControlPage: true,
      },{
        title:'TABLES',
        path: 'TABLES',
        isControlPage: true,
      },
      {
        title:'fetch_page',
        path:'fetchPage',
      },
    ]
  },
  /*{
    title: '互动管理',
    path: 'react-manage',
    icon: MenuFoldOutlined,
    permission: "aasc:order:list", // 权限标识
    children:[
      {
        title: '评论管理',
        path: 'user',
      },
      {
        title:'弹幕管理',
        path: 'role',
      },
    ]
  },
  {
    title: '收益管理',
    path: 'profit-manage',
    icon: MenuFoldOutlined,
    children:[
      {
        title: '创作激励(iframe)',
        path: 'user',
      },
      {
        title:'充电计划(iframe)',
        path: 'role',
        isControlPage: true,
      },
    ]
  },
  {
    title: '创作成长',
    path: 'composer-grow',
    icon: MenuFoldOutlined,
    children:[
      {
        title: '任务成就',
        path: 'user',
      },
      {
        title:'创作学院',
        path: 'role',
        isControlPage: true,
      },
    ]
  },
  {
    title: '创作设置',
    path: 'config',
    icon: ToolOutlined,
  },*/
];

export default menuConfig ;
