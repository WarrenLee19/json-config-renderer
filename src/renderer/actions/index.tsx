import React, { ReactNode, useRef } from 'react';
import { Button, message, Modal, notification, Tooltip } from 'apusic-ui';
import { useNavigate } from 'react-router-dom';
import Dispatcher from '../dispatcher';
import Table from '../table';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { MessageApi } from 'apusic-ui/lib/message';
import { NotificationApi } from 'apusic-ui/lib/notification';
import Form from '../form';
import request from '../../utils/http';
import { isString } from 'lodash';

declare type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

export enum Types {
  ajax = 'ajax',
  modal = 'modal',
  message = 'message',
  confirm = 'confirm',
  notification = 'notification',
  drawer = 'drawer',
  dialog = 'dialog',
  email = 'email',
  download = 'download',
  upload = 'upload',
  cancel = 'cancel',
  close = 'close',
  reload = 'reload',
  link = 'link',
  url = 'url',
  prev = 'prev',
  next = 'next',
  custom = 'custom'
}

export enum ActionType {
  add = 'add',
  detail = 'detail',
  edit = 'edit',
  confirm = 'confirm',
  message = 'message',
  notification = 'notification',
  openNewWindow = 'openNewWindow',
  custom = 'custom'
}

export interface ActionItem {
  type?: Types | ActionType;
  title?: string | ReactNode;
  body?: any;
  api?: string | Promise<any> | object;
  content?: string | ReactNode;
  status?: string | NotificationApi | MessageApi;
  data?: any;
}

const ActionTypeMap: any = {
  [ActionType.add]: [
    { type: Types.modal, title: '新增', body: '' },
    { type: Types.ajax, api: '' },
    { type: Types.message, content: '操作成功' }
  ],
  [ActionType.detail]: [
    { type: Types.ajax, api: '' },
    { type: Types.modal, title: '查看', body: '' }
  ],
  [ActionType.edit]: [
    { type: Types.ajax, api: '' },
    { type: Types.modal, title: '修改', body: '' },
    { type: Types.ajax, api: '' },
    { type: Types.message, content: '操作成功' }
  ],
  [ActionType.confirm]: [
    { type: Types.confirm, title: '提示', content: '' },
    { type: Types.ajax, api: '' },
    { type: Types.message, content: '操作成功' }
  ],
  [ActionType.message]: [
    { type: Types.ajax, api: '' },
    { type: Types.message, content: '操作成功' }
  ],
  [ActionType.openNewWindow]: [{ type: Types.url, url: '' }]
};

export enum AType {
  modal = 'modal',
  confirm = 'confirm',
  message = 'message',
  notification = 'notification',
  openNewWindow = 'openNewWindow',
  upload = 'upload',
  custom = 'custom'
}

export interface ActionProps {
  type?: ActionType;
  showType?: 'link' | 'text' | 'ghost' | 'primary' | 'default' | 'dashed' | React.ReactElement | undefined;
  text: string | Function | React.ReactNode;
  title: string;
  // disabled?:boolean;
  enable?: boolean;
  value?: any;
  rows?: any;
  initApi?: string | Promise<any>;
  api?: string | Promise<any>;
  url?: string;
  body?: any;
  content?: string;
  messageContent?: string;
  icon?: React.ReactNode;
  onfetchData?: Function; // 重新请求数据
  callback?: Function;
}

export const ActionRenderer = (props: ActionProps): JSX.Element => {
  const navigate = useNavigate();
  let childRef = useRef(null);
  const {
    onfetchData,
    type,
    text,
    title,
    showType = 'default',
    enable,
    value,
    rows,
    initApi,
    api,
    url,
    body,
    content,
    messageContent,
    callback
  } = props;
  const submitObj = { ok: false };
  // const checkedContext = useContext(CheckedContext);
  // fix: The parameter text can be a function
  const textRender = typeof text === 'function' ? text(rows) : text;
  // const [visible, setVisible] = useState(false);
  // const [isFetching, setFetching] = useState(false);

  const handleOnClick = () => {
    console.log('=1=', type, value, props);
    if (!type) return message.warn('请选择选择项');
    // if(type !== ActionType.openNewWindow && (!type || !value) ) return message.warn("请选择选择项");
    // let paramsValue = Object.prototype.toString.call(value) !== "[object Array]" ? [value]:value;
    if (type && Object.prototype.toString.call(type) === '[object String]') {
      let datas: any = ActionTypeMap[ActionType[type]];
      switch (type) {
      case ActionType.add:
        datas[0].body = body;
        datas[0].title = title;
        datas[1].api = api;
        datas[2].content = messageContent;
        actions(datas);
        break;
      case ActionType.detail:
        datas[0].api = initApi;
        datas[1].body = body;
        datas[1].title = title;
        actions(datas);
        break;
      case ActionType.edit:
        datas[0].api = initApi;
        datas[1].body = body;
        datas[1].title = title;
        datas[2].api = api;
        datas[3].content = messageContent;
        actions(datas);
        break;
      case ActionType.confirm:
        datas[0].title = title;
        datas[0].content = content;
        datas[1].api = api;
        datas[2].content = messageContent;
        actions(datas);
        break;
      case ActionType.message:
        break;
      case ActionType.openNewWindow:
        if (url && url.indexOf('://') >= 0) {
          window.open(url);
        } else {
          url && navigate(url);
        }
        break;
      case ActionType.custom:
        callback && callback(value, rows);
        break;
      }
    } else {
      actions(type);
    }
    return null;
  };

  async function actions(eventList: any) {
    for (let i = 0; i < eventList.length; i++) {
      await action(eventList[i]).then(
        (res: any) => {
          console.log('eventList', i, res);
          //反馈结果至下步流程
          res && res.result && (eventList[i + 1].data = res.result);
          res && res.status && (eventList[i + 1].status = res.status);
          res && res.content && (eventList[i + 1].content = res.content);
          if (res && res.data) {
            //窗口赋值
            // eventList[i+1].type === Types.modal &&
          }
          if (i == eventList.length && onfetchData) {
            // setFetching(false);
            // setVisible(false);
            onfetchData();
          }
        },
        (rej: any) => {
          rej && rej.result && (eventList[i + 1].data = rej.result);
          rej && rej.status && (eventList[i + 1].status = rej.status);
          rej && rej.content && (eventList[i + 1].content = rej.content);
          console.log('==rej=', rej);
        }
      );
    }
  }

  function action(item: any) {
    const { type, title, content, status } = item;
    switch (type) {
    case Types.confirm: {
      console.log(Types.confirm, item, status);
      return new Promise<void>(res => {
        Modal.confirm({
          title: `${title || '提示'}`,
          icon: <ExclamationCircleOutlined />,
          content: `${content || '确认执行操作'}`,
          onOk: async () => {
            res();
          }
        });
      });
    }
    case Types.ajax: {
      console.log('Types.ajax', Types.ajax, item, value, rows);
      return new Promise(async (res, rej) => {
        let apiPath: any = item.api;

        if (isString(apiPath)) apiPath = apiPath + '/' + value;

        if (apiPath.method?.toUpperCase() === 'GET') {
          apiPath.url = apiPath.url + '/' + value;
        } else apiPath.data = { ...apiPath.data, ids: value };

        const result = await request(apiPath);
        const { status, data } = result;
        if (status === 1) {
          let ret: { type?: string; content: string; status: NoticeType; data: any } = {
            data: data,
            content: '操作成功',
            status: 'success'
          };
          res(ret);
        } else {
          let ret: { type?: string; content: string; status: NoticeType } = {
            content: '操作失败',
            status: 'error'
          };
          rej(ret);
        }
      });
    }
    case Types.message: {
      console.log(Types.message, item, status);
      // message.success('This is a success message');
      return new Promise<void>((res, rej) => {
        //error warning
        // message.success('This is a success message');
        // message.error(item.content || '操作异常')
        // status === 'error' &&  notification.error({message:item.title,description:item.content});
        // status === 'success' &&  notification.success({message:item.title,description:item.content});
        if (status === 'success') {
          message.success(item.content || '操作成功');
        }
        if (status === 'error') {
          message.error(item.content || '操作异常');
        }
        status === 'warn' && message.warn(item.content || '操作提示');
        // res();
      });
    }
    case Types.notification: {
      return new Promise<void>(res => {
        // info warning error
        status === 'success' &&
          notification.success({ message: item.title, description: item.content || '操作成功' });
        status === 'error' && notification.error({ message: item.title, description: item.content });
        status === 'warning' && notification.warning({ message: item.title, description: item.content });
        status === 'info' && notification.info({ message: item.title, description: item.content });
        res();
      });
    }
    case Types.modal: {
      console.log('=mmm=', Types.modal, item);
      submitObj.ok = false;
      return new Promise(async res => {
        Modal.confirm({
          className: 'cf-modal',
          closable: true,
          icon: null,
          width: item.modalWidth || 600,
          title: item.title,
          // confirmLoading: true,
          // destroyOnClose: true,
          centered: true,
          // content: (
          //     <BrowserRouter>
          //         {body && <Dispatcher data={body}/>}
          //     </BrowserRouter>
          // ),
          // onOk: ()=>{
          //     res()
          content: body && modalPage(body, childRef),
          okText: '确定',
          cancelText: '取消',
          onOk: async () => {
            await childRef.current;
            console.log('====childRef===', childRef);
            let ret: { result: null; status: NoticeType } = { result: childRef.current, status: 'success' };
            res(ret);
          },
          onCancel: () => {
            console.log('==onCancel');
          }
        });
      });
    }
    // case Types.alert:
    //     break;
    // case Types.dialog:
    //     break;
    default: {
      return new Promise<void>(res => {
        res();
      });
    }
    }
  }

  return (
    <div>
      {showType === 'link' || showType === 'text' ?
        <span onClick={handleOnClick} style={{ color: '#4578F8', cursor: 'pointer' }}>
          {textRender}
        </span>
        : typeof showType === 'string' ?
          <Button type={showType} onClick={handleOnClick} disabled={enable || value && value.length > 0 ? false : true}>
            {textRender}
          </Button>
          : showType ?
            <a onClick={handleOnClick} style={{ color: '#4578F8', cursor: 'pointer', fontSize: 16 }}>
              <Tooltip title={textRender}>{showType}</Tooltip>
            </a>
            : null}
    </div>
  );
};

const modalPage = (body: any, childRef: any) => {
  switch (body.type) {
  case 'table':
    return <Table data={body} ref={childRef} />;
  case 'form':
    return <Form data={body} />;
  default:
    return <Dispatcher data={body} />;
  }
};

export default ActionRenderer;
