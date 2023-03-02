import React, { useEffect, useState } from 'react';
import { Layout } from 'apusic-ui';
import Dispatcher from '../dispatcher';
import ActionRenderer from '../actions';

const { Content } = Layout;

declare type position = 'topLeft' | 'topRight' | 'topCenter' | 'bottomLeft' | 'bottomRight' | 'bottomCenter';

interface TContainer {
  type: string;
  actions?: Array<any>[];
  actionsPosition?: position;
  body: any;
}

interface TProps {
  data: TContainer;
}

export default function ContainerRenderer(props: TProps) {
  const { data } = props;
  const { type, actions, actionsPosition = 'topLeft', body } = data;
  // const [searchParams, setSearchParams] = useState<any>({});
  const [selectKeys, setSelectKeys] = useState<any>([]);
  const [selectRows, setSelectRows] = useState<any>([]);

  useEffect(() => {
  }, [data]);

  // const handleSearchClick=(obj: any = {reload: true})=>{
  //     setSearchParams(obj); // style={{display: header ? '':"none" }}
  // }
  const handleSelect = (val?: any, val1?: any) => {
    val && setSelectKeys(val);
    val1 && setSelectRows(val1);
  };

  const actionNode =
    <div className={`cf-container-actions cf-container-actions-${actionsPosition}`}>
      {actions && actions.length > 0
        ? actions.map((item: any, idx: number) => {
          return (
            <ActionRenderer
              key={idx}
              {...item}
              text={item.text}
              showType={item.showType || 'default'}
              value={selectKeys}
              rows={selectRows}
              type={item.type}
            />
          );
        })
        : null}
    </div>
  ;
  const bodyNode =
    <Content className={'cf-container-body'}>{body && <Dispatcher data={body} onSelect={handleSelect} />}</Content>
  ;
  return (
    <div className={'cf-container'}>
      {actionsPosition.indexOf('top') === 0 ?
        <>
          {' '}
          {actionNode} {bodyNode}
        </>
        :
        <>
          {bodyNode} {actionNode}
        </>
      }
    </div>
  );
}
