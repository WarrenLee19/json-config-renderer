import { Pagination, Space, Table as ApusicTable } from 'apusic-ui';
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react'; //useCallback
import Actions from '../actions';
import { SizeType } from 'apusic-ui/lib/config-provider/SizeContext';
import CheckedContext from '../actions/checkdContext';
import { isString } from 'lodash';

export enum TPaginationPosition {
  topLeft = 'topLeft',
  topCenter = 'topCenter',
  topRight = 'topRight',
  bottomLeft = 'bottomLeft',
  bottomCenter = 'bottomCenter',
  bottomRight = 'bottomRight',
  none = 'none'
}

export interface TPagination {
  position?: TPaginationPosition;
  pageSize?: number;
}

interface TFilter {
  current?: number;
  size?: number | undefined;

  [propName: string]: any;
}

export interface TData {
  type: string;
  size: 'middle' | 'small';
  title: string;
  style: any;
  rowKey?: string;
  columns: Array<any>;
  actions: Array<any>;
  api: string | Promise<any>;
  // initApi: string | Promise<any>;
  dataSource: Array<any> | string;
  className: string | Array<string>;
  width?: number | string;
  debug: boolean;
  pagination?: TPagination;
  bordered: boolean;
  checkbox?: boolean;
  actionSpaceLine?: boolean;
  searchParams?: any;
  // onSelect: Function;
}

export interface TableProps {
  data: TData;
  onSelect?: Function;
}

export default forwardRef(function(props: TableProps, ref: React.Ref<any>) {
  const { data, onSelect } = props;
  let {
    className,
    title,
    actions = [],
    columns,
    bordered,
    checkbox = true,
    rowKey = 'id',
    dataSource,
    size,
    style,
    searchParams
  } = data;
  const { api, pagination, actionSpaceLine } = data;
  const [loading, setLoading] = useState<boolean>(false);
  const [tableColumns, setTableColumns] = useState<any[]>([]);
  const [dataSourceList, setDataSourceList] = useState<any>([]);
  const [filter, setFilter] = useState<TFilter>({ current: 1, size: 10 });
  const [total, setTotal] = useState<number>(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const checkedContext = useContext(CheckedContext);

  useEffect(() => {
    let tColumns = [...columns];
    tColumns &&
    tColumns.length > 0 &&
    tColumns.map((item: any) => {
      if (item.status) {
        item.render = (text: any) => {
          const status =
            item.status && Object.keys(item.status).length > 0
              ? item.status
              : {
                start: { color: '#28D255', title: '运行' },
                stop: { color: '#E40000', title: '停止' },
                exception: { color: '#df7489', title: '异常' },
                offline: { color: '#df5612', title: '离线' }
              };
          return !text ?
            ''
            :
            <>
              <span
                style={{
                  display: 'inline-block',
                  background: status[text].color,
                  width: '8px',
                  height: '8px',
                  margin: '0 8px',
                  borderRadius: '50%'
                }}
              />
              <span>{status[text].title}</span>
            </>
          ;
        };
      }
    });
    if (actions && actions.length > 0)
      tColumns = [
        ...tColumns,
        {
          title: '操作',
          key: 'operation',
          fixed: 'right',
          width: actions.length * 50,
          render: (text: string | undefined, record: any) => {
            const spaceLine: { size: SizeType; split: React.ReactNode } = {
              size: 'middle',
              split: <div style={{ width: '1px', height: '16px', background: '#DDD' }} />
            };
            const spaceProps = actionSpaceLine ? spaceLine : {};
            // @ts-ignore
            return (
              <Space {...spaceProps}>
                {actions.map((item: any, idx: number) => {
                  return (
                    <Actions
                      key={idx}
                      showType={item.showType || 'link'}
                      value={record[rowKey]}
                      rows={record}
                      {...item}
                    />
                  );
                })}
              </Space>
            );
          }
        }
      ];
    setTableColumns(tColumns);
  }, [data]);

  useEffect(() => {
    if (pagination?.pageSize) setFilter({ ...filter, size: pagination.pageSize });
  }, [pagination]);

  useEffect(() => {
    setLoading(true);
    console.log('=', dataSource, data);
    if (dataSource && Array.isArray(dataSource) && dataSource.length > 0) {
      setTotal(dataSource.length);
      setDataSourceList(dataSource);
    } else if (api) fetchTableList();
    setLoading(false);
  }, [api, dataSource]);

  useEffect(() => {
    if (api) fetchTableList();
  }, [searchParams]);

  useImperativeHandle(ref, () => {
    return selectedRowKeys;
  });

  async function fetchTableList(filterSearch: TFilter = {}) {
    let apiPath: any = api;

    if (isString(apiPath)) apiPath = urlSearchPath(apiPath);
    if (apiPath.method?.toUpperCase() === 'GET') {
      apiPath.url = urlSearchPath(apiPath.url);
    } else apiPath.data = { ...apiPath.data, ...searchParams, pageInfo: { ...filter } };
  }

  const urlSearchPath = (url: string) => {
    url = url.indexOf('?') > 0 ? url : url + '?';
    for (var i in searchParams) {
      searchParams[i] && (url = url + '&' + i + '=' + searchParams[i]);
    }
    return url;
  };

  if (Array.isArray(className)) {
    className = className.join('');
  }

  function handleChangeOfTableRowSelect(selectedRowKeys: React.Key[], selectedRows: any[]) {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(selectedRows);
    onSelect && onSelect(selectedRowKeys, selectedRows);
    checkedContext && checkedContext.handleSelect && checkedContext.handleSelect(selectedRowKeys, selectedRows);
  }

  function handleChangeOfPagination(currentPage: number, pageSize: number | undefined) {
    setFilter({
      ...filter,
      size: pageSize,
      current: currentPage
    });
  }

  let tableParams: any = {
    rowKey: rowKey,
    className: 'cf-table',
    size: size,
    bordered: bordered,
    loading: loading,
    pagination: { position: [pagination?.position || TPaginationPosition.bottomRight], pageSize: pagination?.pageSize }
  };
  (!dataSource && total < (pagination?.pageSize || 10) || pagination === null) &&
  (tableParams = { ...tableParams, pagination: false });
  if (checkbox) {
    tableParams = {
      ...tableParams,
      rowSelection: {
        type: 'checkbox',
        checkStrictly: false,
        onChange: handleChangeOfTableRowSelect,
        selectedRowKeys
      }
    };
  }
  const tableNode =
    <ApusicTable
      {...tableParams}
      columns={
        tableColumns && tableColumns.length > 0
          ? tableColumns.map((item: any) => ({ ...item, dataIndex: item.key }))
          : []
      }
      dataSource={dataSourceList && dataSourceList.length > 0 ? dataSourceList.map((item: any) => ({ ...item })) : []} //, key: rowKey ? item[rowKey]:item.id
    />
  ;

  const paginationNode =
    <Pagination
      className={`cf-pagination cf-table-pagination cf-pagination-${
        pagination?.position || TPaginationPosition.bottomRight
      }`}
      size='small'
      showSizeChanger
      showQuickJumper
      // showTotal={showTotal}
      current={filter.current}
      pageSize={filter.size}
      total={total}
      onChange={(page, pageSize) => handleChangeOfPagination(page, pageSize)}
    />
  ;

  const loadTablePagination = (type: string | null) => {
    switch (type) {
    case TPaginationPosition.topLeft:
    case TPaginationPosition.topCenter:
    case TPaginationPosition.topRight: {
      return (
        <>
          {' '}
          {paginationNode} {tableNode}{' '}
        </>
      );
    }
    case TPaginationPosition.none:
      return <>{tableNode}</>;
    case TPaginationPosition.bottomLeft:
    case TPaginationPosition.bottomCenter:
    case TPaginationPosition.bottomRight: {
      return (
        <>
          {tableNode} {paginationNode}
        </>
      );
    }
    default:
      return (
        <>
          {tableNode} {paginationNode}
        </>
      );
    }
  };

  const render =
    <>
      <div className={'cf-table-container ' + className} style={{ ...style }}>
        {title && <div className={'cf-table-header'}>{title}</div>}
        {loadTablePagination(
          !pagination && pagination !== undefined ||
          dataSource && dataSource.length > 0 ||
          total > (pagination?.pageSize || 10)
            ? TPaginationPosition.none
            : pagination?.position || TPaginationPosition.bottomRight
        )}
      </div>
    </>
  ;
  return render;
});