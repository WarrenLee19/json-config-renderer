import React from 'react';
import TableRenderer from '../table';
import DescriptionRenderer from '../descriptions';
import PageRenderer from '../page';
import ContainerRenderer from '../container';
import FormRenderer from '../form';
import { isString } from 'lodash';

interface DispatcherProps {
  data: any;
  fetchData?: any;
  searchParams?: any;
  onSelect?: Function;
}

export enum ComponentTypes {
  PAGE = 'PAGE',
  CONTAINER = 'CONTAINER',
  TABLE = 'TABLE',
  FORM = 'FORM',
  DESCRIPTION = 'DESCRIPTION',
  LIST = 'LIST',
  CARD = 'CARD'
}

export function Dispatcher(props: DispatcherProps) {
  const { data, fetchData, onSelect, searchParams } = props;

  const components = (data: any, idx: number = 1) => {
    if (isString(data) || typeof data === 'number') return <div key={idx}>{data}</div>;
    console.log(`=data.type: ${data.type}=`, data);
    switch (data.type && data.type.toUpperCase()) {
    case ComponentTypes.PAGE:
      return <PageRenderer key={idx} data={data} />;
    case ComponentTypes.CONTAINER:
      return <ContainerRenderer key={idx} data={data} />;
    case ComponentTypes.TABLE:
      return (
        <TableRenderer
          key={idx}
          data={{ ...data, dataSource: data?.dataSource || fetchData, searchParams }}
          onSelect={onSelect}
        />
      );
    case ComponentTypes.FORM:
      return <FormRenderer key={idx} data={data} />;
    case ComponentTypes.LIST:
      return <div key={idx}>列表</div>;
    case ComponentTypes.CARD:
      return <div key={idx}>card</div>;
    case ComponentTypes.DESCRIPTION:
      return <DescriptionRenderer key={idx} data={data} />;
    default:
      return '不支持的组件';
    }
  };

  return (
    <>
      {Array.isArray(data)
        ? data.map((renderer: any, index: number) => {
          return components(renderer, index);
        })
        : components(data)}
    </>
  );
}

export default Dispatcher;
