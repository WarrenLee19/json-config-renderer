import {
  Button,
  Checkbox,
  DatePicker,
  Form as FormComp,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  UploadProps
} from 'apusic-ui';
import { Rule } from 'rc-field-form/lib/interface';
import { DataNode } from 'rc-tree-select/lib/interface';
import React from 'react';
import { namePattern, passwordPattern } from '../../utils/pattern';
import { LabelConfig, renderLabel } from './form-label';
import { UploadListType } from 'apusic-ui/lib/upload/interface';

export interface FormItemWatcher {
  name: string;
  value: string;
  operator: '=' | '>' | '!=' | '<' | '<=' | '>=';
}

export interface FormItemProps {
  type: string;
  name: string;
  label: string;
  rules?: Array<any>;
  disabled?: boolean;
  options?: Array<string>;
  placeholder?: string;
  span: number; //占位
  offset: number;
  showTime?: boolean;
  picker?: 'week' | 'month' | 'quarter' | 'year';
  treeData?: DataNode[];
  rows?: number;
  render?: any;
  body: Array<FormItemProps>;
  prefix?: React.ReactNode;
  initialValue?: any;
  watchers?: Array<FormItemWatcher>;
  action?: string;
  listType?: Pick<UploadProps, 'listType'>;
  beforeUpload: boolean;
}

export interface renderItemConfig {
  labelConfig?: LabelConfig;
}

const Option = Select.Option;

interface supportFormItems {
  [name: string]: Function;
}

export const supportFormItems: supportFormItems = {
  input: renderInput,
  'input-name': renderInput,
  'input-email': renderInput,
  'input-password': renderInput,
  'input-number': renderInput,
  radio: renderRadio,
  'radio-group': renderRadio,
  select: renderSelect,
  switch: renderSwitch,
  checkbox: renderCheckbox,
  rate: renderRate,
  slider: renderSlider,
  'time-picker': renderTimePicker,
  'date-picker': renderDatePicker,
  'range-picker': renderDatePicker,
  'tree-select': renderTreeSelect,
  textarea: renderTextArea,
  custom: renderCustom,
  upload: renderUpload
};

export function renderCustom(props: FormItemProps) {
  if (!props.render) {
    return <span className={'cf-form-label'}>缺少render</span>;
  }
  return props.render();
}

export interface renderItemStructure {
  className: string;
  children: React.ReactNode;
  valuePropName: string;
  rules: Array<any>;
  name: string;
  label: React.ReactNode;
  initialValue?: any;
}

function mapValuePropNames(type: string): string {
  const map: {
    [x: string]: string;
  } = {
    switch: 'checked',
    upload: 'fileList'
  };
  return map[type] ? map[type] : 'value';
}

export function renderItem(FormItem: FormItemProps, restProps: renderItemConfig) {
  const finalFormItemProps: renderItemStructure = {
    name: FormItem.name,
    label: '',
    className: 'cf-Form-item',
    valuePropName: mapValuePropNames(FormItem.type),
    rules: mapFormItemRules(FormItem),
    children: renderFormItem(FormItem, restProps)
  };

  if (FormItem.initialValue) {
    finalFormItemProps.initialValue = FormItem.initialValue;
  }

  renderLabel(FormItem, restProps.labelConfig, finalFormItemProps);

  return <FormComp.Item {...finalFormItemProps} />;
}

export function mapFormItemRules(props: FormItemProps): Rule[] {
  const { type, rules = [] } = props;
  let consequenceRules: Rule[] = [];

  switch (type) {
  case 'input-name':
    consequenceRules = [
      {
        pattern: namePattern,
        message: '用户名不合法!'
      },
      ...rules
    ];
    break;
  case 'input-email':
    consequenceRules = [
      {
        type: 'email'
      },
      ...rules
    ];
    break;
  case 'input-password':
    consequenceRules = [
      {
        pattern: passwordPattern,
        message: '密码不合法!'
      },
      ...rules
    ];
    break;
  case 'input-number':
    consequenceRules = props.rules || [];
    break;
  default:
    consequenceRules = props.rules || [];
  }
  return consequenceRules;
}

function renderInput(props: FormItemProps) {
  const { type } = props;

  const inputProps = {
    disabled: props.disabled,
    placeholder: props.placeholder
  };

  switch (type) {
  case 'input-password':
    return <Input.Password prefix={props.prefix} {...inputProps} />;
  case 'input-number':
    return <InputNumber style={{ width: '100%' }} {...inputProps} />;
  default:
    return <Input prefix={props.prefix} {...inputProps} />;
  }
}

function renderSelect(props: FormItemProps) {
  const { options = [], placeholder, disabled } = props;

  return (
    <Select placeholder={placeholder} disabled={disabled}>
      {options.map((option: string) => {
        return (
          <Option value={option} key={option}>
            {option}
          </Option>
        );
      })}
    </Select>
  );
}

function renderSwitch(props: FormItemProps) {
  const { disabled } = props;
  return <Switch disabled={disabled} />;
}

function renderCheckbox(props: FormItemProps) {
  const { options, disabled } = props;

  return <Checkbox.Group options={options} disabled={disabled} />;
}

function renderRate(props: FormItemProps) {
  const { disabled } = props;
  return <Rate disabled={disabled} />;
}

function renderSlider(props: FormItemProps) {
  const { disabled } = props;
  return <Slider disabled={disabled} />;
}

function renderRadio(props: FormItemProps) {
  const { options = [], disabled, type } = props;

  switch (type) {
  case 'radio-group':
    return (
      <Radio.Group disabled={disabled}>
        {options.map((value: string) => {
          return (
            <Radio.Button value={value} key={value}>
              {value}
            </Radio.Button>
          );
        })}
      </Radio.Group>
    );
  default:
    return (
      <Radio.Group disabled={disabled}>
        {options.map((value: string) => {
          return (
            <Radio value={value} key={value}>
              {value}
            </Radio>
          );
        })}
      </Radio.Group>
    );
  }
}

function renderUpload(props: FormItemProps) {
  const { disabled, action = '', listType = 'picture', beforeUpload = false } = props;
  return (
    <Upload listType={listType as UploadListType} action={action} disabled={disabled}>
      <Button>点击上传</Button>
    </Upload>
  );
}

function renderTimePicker(props: FormItemProps) {
  const { disabled } = props;
  return <DatePicker.TimePicker disabled={disabled} />;
}

function renderDatePicker(props: FormItemProps) {
  const { type, disabled, showTime = false, picker } = props;
  switch (type) {
  case 'range-picker':
    return <DatePicker.RangePicker disabled={disabled} showTime={showTime} picker={picker} />;
  case 'date-picker':
    return <DatePicker disabled={disabled} showTime={showTime} picker={picker} />;
  }
  return '不支持的日期组件';
}

function renderTreeSelect(props: FormItemProps) {
  const { disabled, treeData } = props;
  return <TreeSelect disabled={disabled} style={{ width: '100%' }} treeData={treeData} />;
}

function renderTextArea(props: FormItemProps) {
  const { disabled, rows = 3 } = props;
  return <Input.TextArea disabled={disabled} rows={rows} />;
}

export function renderFormItem(props: FormItemProps, restProps: renderItemConfig) {
  const { type } = props;

  let ele: any = '';

  let wrapperStyle: any = {};

  if (restProps.labelConfig) {
    if (typeof restProps.labelConfig.width !== 'number') {
      console.error('label配置的宽度必须是数值!');
    }

    if (restProps.labelConfig.width) {
      wrapperStyle.width = `calc(100% - ${restProps.labelConfig.width}px)`;
    }
  }

  return supportFormItems[type] ? supportFormItems[type](props) : ele;
}
