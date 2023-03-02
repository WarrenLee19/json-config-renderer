import { Button, Col, Form, Input, Row, Select, TreeSelect, DatePicker } from 'apusic-ui';
import React, { useEffect } from 'react';
const { Option } = Select;
const { RangePicker } = DatePicker;
interface TProps {
  onChange?: Function;
  data?: any;
  items?: any[];
}
export enum FormItemType {
  SELECT = 'SELECT',
  INPUT = 'INPUT',
  INPUTNUMBER = 'INPUTNUMBER',
  PASSWORD = 'PASSWORD',
  TREESELECT = 'TREESELECT',
  DATEPICKER = 'DATEPICKER'
  //null的时候表示自定义
}
const formItemRender = (item: any) => {
  const { style, type } = item;
  switch (type) {
    case FormItemType.INPUT:
      return <Input placeholder="请输入···" style={{ ...style }} />;
    case FormItemType.SELECT:
      return (
        <Select allowClear>
          {item.selectPayload &&
            item.selectPayload.length > 0 &&
            item.selectPayload.map((op: any, idx: number) => {
              return (
                <Option key={idx} value={op.value}>
                  {op.label}
                </Option>
              );
            })}
        </Select>
      );
    case FormItemType.TREESELECT:
      return <TreeSelect allowClear treeData={item.selectPayload} />;
    case FormItemType.DATEPICKER: {
      return <RangePicker style={{ ...style }} />;
    }
    default:
      return;
  }
};

export const SearchForm = (props: TProps) => {
  const [form] = Form.useForm();
  const { onChange, items, data } = props;

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  const getFields = () => {
    const children = [];
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      children.push(
        <Col span={6} key={i}>
          <Form.Item {...item.formItemProps} style={{ marginBottom: '16px' }}>
            {formItemRender(item)}
          </Form.Item>
        </Col>
      );
    }
    return children;
  };
  const onFinish = (values: any) => {
    onChange && onChange(values);
  };

  return (
    <Form form={form} name="advanced_search" className="ant-advanced-search-form" onFinish={onFinish} labelStyle={{}}>
      <Row gutter={24}>
        {items && items.length > 0 && getFields()}
        {items && items.length % 4 > 0 && (
          <Col span={(4 - (items.length % 4)) * 6} style={{ textAlign: 'right' }}>
            <Button
              style={{ margin: '0 8px' }}
              onClick={() => {
                form.resetFields();
                onChange && onChange(form.getFieldsValue());
              }}
            >
              重置
            </Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#ffffff', color: '#4578f8' }}>
              查询
            </Button>
          </Col>
        )}
      </Row>
      {items && items.length % 4 == 0 && (
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button
              style={{ margin: '0 8px 16px 0' }}
              onClick={() => {
                form.resetFields();
              }}
            >
              重置
            </Button>
            <Button type="primary" htmlType="submit" style={{ background: '#ffffff', color: '#4578f8' }}>
              查询
            </Button>
          </Col>
        </Row>
      )}
    </Form>
  );
};

export const HighSearch = (props: TProps) => {
  const { items } = props;
  return (
    <div className={'cf-page-header-high-search'}>
      <SearchForm {...props} />
    </div>
  );
};
