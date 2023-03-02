import React, { useCallback, useEffect } from 'react';
import { Form, notification, Row } from 'apusic-ui';
import { FormItemProps, renderItem } from './form-item';
import { nanoid } from 'nanoid';
import { LabelConfig } from './form-label';
import ActionRenderer from '../actions';

export interface FormProps {
  data: FormConfigProps;
}

export interface FormConfigProps {
  type: string;
  name: string;
  body: Array<FormItemProps>;
  actions: Array<any>;
  api: string | Promise<any>;
  initApi: any;
  className: string | Array<string>;
  debug: boolean;
  columnCount: number;
  labelConfig?: LabelConfig;
  watchers?: any[];
}

export interface FormAction {
  type: string;
  disable?: boolean;
  action: any;
}

/**
 * 布局计算
 */
function renderLayout(FormItems: Array<FormItemProps>, columnCount: number, restProps: any) {
  let elements: Array<Array<any>> = [];

  const renderCol = function(FormItem: FormItemProps) {
    let renderGroup = () =>
      renderLayout(FormItem.body as Array<FormItemProps>, FormItem.body.length, restProps);
    //默认一列的占比
    return (
      <div key={`${FormItem.name}-` + columnCount} className={`cf-Form--column cf-Form--column-${columnCount}`}>
        {FormItem.type === 'group' ? renderGroup() : renderItem(FormItem, restProps)}
      </div>
    );
  };

  let tempElements: Array<FormItemProps> = [];

  // @ts-ignore
  for (const [index, FormItem] of FormItems.entries()) {
    let itemIndex = index + 1;
    if (itemIndex % columnCount !== 0) {
      tempElements.push(FormItem);
      continue;
    }

    if (itemIndex % columnCount === 0) {
      tempElements.push(FormItem);
      elements.push(tempElements);
      tempElements = [];
    }
  }

  if (tempElements.length > 0) {
    elements.push(tempElements);
  }

  // 真实渲染items
  for (const items of elements) {
    for (const item of items) {
      item.ele = renderCol(item);
    }
  }

  let renderEles = [];
  // @ts-ignore
  for (const [index, eles] of elements.entries()) {
    let template =
      <Row key={index}>
        {eles.map((item: any) => {
          return item.ele;
        })}
      </Row>
    ;
    renderEles.push(template);
  }

  return renderEles;
}

/**
 * 自动生成表单name
 * @constructor
 */
function AutoGenerateFormName() {
  return `cf-form-${nanoid()}`;
}

export default function FormRenderer(props: FormProps) {
  const { data } = props;

  let {
    className,
    name = AutoGenerateFormName(),
    body = [],
    actions,
    debug = false,
    columnCount = 1,
    ...restProps
  } = data;
  const { api, initApi, labelConfig, watchers = [] } = data;

  const [form] = Form.useForm();

  let _data = { ...restProps };

  useEffect(() => {
    handleInitForm();
  }, [initApi]);

  if (Array.isArray(className)) {
    className = className.join('');
  }

  let formStyle: Record<string, string> = {
    width: '80px'
  };

  if (labelConfig) {
    if (labelConfig.width) {
      formStyle = {
        width: `${labelConfig.width}px`
      };
    }
  }

  const handleValuesChange = useCallback((values: any) => {
    if (debug) {
      notification.open({
        message: '数据变更',
        description: JSON.stringify(values)
      });
    }
  }, []);

  async function handleInitForm() {

  }

  function handleCheck() {
    return form.validateFields();
  }

  async function handleSubmit() {
    const values = form.getFieldsValue();
  }

  const renderActions = useCallback((actions: Array<FormAction>) => {
    return (
      <>
        {actions.map((act: FormAction, index: number) => {
          let wrapper =
            <div className={'cf-form-ac-btn'} key={index}>
              <ActionRenderer {...act.action} />
            </div>
          ;

          return wrapper;
        })}
      </>
    );
  }, []);

  return (
    <div className={'cf-form-container ' + className}>
      <Form
        name={name}
        form={form}
        autoComplete='off'
        style={{ width: '100%' }}
        onValuesChange={handleValuesChange}
        labelStyle={formStyle}
      >
        {renderLayout(body, columnCount, _data)}
      </Form>

      {actions ?
        <div className={'cf-form-footer'}>
          <div className='cf-form-actions'>{/*{renderActions(actions)}*/}</div>
        </div>
        :
        ''
      }
    </div>
  );
}
