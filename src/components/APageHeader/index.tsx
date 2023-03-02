
import React from 'react';
import {Input, Space} from 'apusic-ui';
import _ from 'lodash';
import Actions from '../../renderer/actions';
import { HighSearch } from '../../renderer/page/search';

const { Search } = Input;

type extraRightEnum = 'default';

interface headertype {
  bulkActions?: any[];
  children?: React.ReactNode;
  style?: any;
  extraRight?: extraRightEnum | React.ReactNode;
  onSearchChange?: Function;
  searchOptions?: any;
  search?: any; // 高级搜索
}

interface Tprops {
  title?: string | React.ReactNode;
  header?: headertype;
  value?: any;
  rows?: any;
  onSearch?: Function;
}

export const APageHeader = function (props: Tprops) {
  const {
    title: pageTitle = '标题', header = {}, value, rows, onSearch,
  } = props;
  const {
    bulkActions, // 主体操作
    children, // 优先级 children > bulkActions
    extraRight, // 第一行右侧的内容自定义
    style = {}, // 样式
    searchOptions = {}, // 覆盖默认的Search组件的参数（extraRight: default才有效）
    onSearchChange = () => {
    }, // 默认的Search组件change（extraRight: default才有效）
    search = {},
  } = header;
  // 给Search组件change函数添加防抖处理
  const onChange = _.debounce((e: any) => onSearchChange(e.target.value), 300);
  return (
    <div className="apusic-page-header" style={style}>
      <div className="page-header-first-line">
        <div className="page-header-title">{pageTitle}</div>
        {extraRight ? (
          extraRight === 'default' ? (
            <Search
              allowClear
              maxLength={50}
              placeholder="请输入"
              style={{ width: '200px' }}
              onChange={onChange}
              {...searchOptions}
            />
          ) : (
            extraRight
          )
        ) : null}
      </div>
      {search?.items?.length > 0 && <HighSearch onChange={onSearch} items={search?.items} />}
      {(children || bulkActions?.length) && (
        <div className="page-header-second-line">
          {children || (
            <Space>
              {bulkActions?.length
                ? bulkActions.map((item: any, idx: number) => (
                  <Actions
                    key={idx}
                    {...item}
                    text={item.text}
                    showType={item.showType || 'default'}
                    value={value}
                    rows={rows}
                    type={item.type}
                  />
                ))
                : null}
            </Space>
          )}
        </div>
      )}
    </div>
  );
};

export default APageHeader;
