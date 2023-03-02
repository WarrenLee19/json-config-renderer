import React, { ReactNode, useEffect, useState } from 'react';
import { Descriptions as ApusicDescriptions, Space, Tooltip } from 'apusic-ui';
import Actions from '../actions';

export type DSizeNumber = 'middle' | 'small';
export type DLayoutNumber = 'horizontal' | 'vertical';

interface apiObject {
  url: string;
  callback: (result: any) => any;
}

type Api = string | Promise<any> | apiObject;

interface RcComponentConfig {
  type: string;

  [propName: string]: any;
}

export interface DProps {
  data: DesProps;
}

export interface DesProps {
  size?: DSizeNumber;
  layout?: DLayoutNumber;
  body?: any;
  title: string;
  contentStyle?: any;
  labelStyle?: any;
  column?: number;
  initApi: string | Promise<any>;
  dataSource: Array<any>;
  extra?: Array<ReactNode | RcComponentConfig>;
  bordered?: boolean;
  colon?: boolean;
  toolTip?: boolean;
  rowKey?: Array<any>;
  debug: boolean;
}

export interface DesItemProps {
  span?: number;
  contentStyle?: any;
  labelStyle?: any;
  label?: ReactNode;
  content?: ReactNode;
  children: ReactNode;
}

const defaultContent = {
  color: '#333',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  display: 'inline-block'
};
const defaultLabel = { color: '#797979' };

export default function DescriptionRender(props: DProps) {
  const [dataSourceList, setDataSourceList] = useState<any>([]);
  const { data } = props;
  const {
    title,
    toolTip,
    contentStyle,
    labelStyle,
    bordered,
    column,
    colon,
    extra,
    layout,
    size,
    body,
    initApi,
    dataSource,
    rowKey = []
  } = data;
  const contentMergeStyle = Object.assign(defaultContent, contentStyle);
  const labelMergeStyle = Object.assign(defaultLabel, labelStyle);

  async function handleInitForm(initApi: Api, params: any = {}) {

  }

  function renders(body: any | undefined, toolTip: boolean | undefined) {
    // 用户自定义组件
    if (typeof body == 'object' && typeof body?.$$typeof === 'symbol') return body;
    // 渲染react-json-renderer内置组件
    if (body?.type) return <Actions showType={body.showType || 'link'} {...body} />;
    if (toolTip)
      return (
        <Tooltip placement='topLeft' title={body}>
          {body}
        </Tooltip>
      );
    // 简单组件
    return <>{body}</>;
  }

  function DescriptionItem(props: DesItemProps) {
    const { label, contentStyle, labelStyle, span, children } = props;
    return (
      <ApusicDescriptions.Item label={label} contentStyle={contentStyle} labelStyle={labelStyle} span={span}>
        {children}
      </ApusicDescriptions.Item>
    );
  }

  function renderExtra(): JSX.Element | null {
    if (extra && extra.length > 0) {
      // @ts-ignore
      return (
        <Space>
          {extra.map((action: any, idx: number) => {
            // 用户自定义组件
            if (typeof action == 'object' && typeof action?.$$typeof === 'symbol') return action;
            // 渲染react-json-renderer内置组件
            if (action?.type) return <Actions showType={action.showType || 'link'} {...action} />;
            // 简单组件
            return <div>{action}</div>;
          })}
        </Space>
      );
    }
    return null;
  }

  useEffect(() => {
    if (dataSource && dataSource.length > 0) {
      setDataSourceList(dataSource);
    } else handleInitForm(initApi);
  }, [initApi, dataSource]);
  if (Object.prototype.toString.call(rowKey) === '[object Object]') {
    return (
      <ApusicDescriptions
        title={
          title &&
          <div
            className={Object.prototype.toString.call(title) === '[object String]' ? 'cf-descriptions-header' : ''}
          >
            {title}
          </div>

        }
        contentStyle={contentMergeStyle}
        labelStyle={labelMergeStyle}
        bordered={bordered}
        column={column}
        colon={colon}
        extra={renderExtra()}
        layout={layout}
        size={size}
      >
        {dataSourceList &&
          Object.keys(rowKey).map((label: any) =>
            <DescriptionItem
              label={rowKey[label]}
              labelStyle={body?.labelStyle}
              contentStyle={body?.contentStyle}
              span={body?.span}
            >
              {renders(dataSourceList[label], toolTip)}
            </DescriptionItem>
          )}
      </ApusicDescriptions>
    );
  } else {
    return (
      <ApusicDescriptions
        title={
          title &&
          <div
            className={Object.prototype.toString.call(title) === '[object String]' ? 'cf-descriptions-header' : ''}
          >
            {title}
          </div>

        }
        contentStyle={contentMergeStyle}
        labelStyle={labelMergeStyle}
        bordered={bordered}
        column={column}
        colon={colon}
        extra={renderExtra()}
        layout={layout}
        size={size}
      >
        {dataSourceList &&
          (rowKey.length > 0 ? rowKey : Object.keys(dataSourceList)).map((label: any) =>
            <DescriptionItem
              label={label}
              labelStyle={body?.labelStyle}
              contentStyle={body?.contentStyle}
              span={body?.span || 1}
            >
              {renders(dataSourceList[label], toolTip)}
            </DescriptionItem>
          )}
      </ApusicDescriptions>
    );
  }
}
