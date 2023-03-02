import React from 'react';
import { FormItemProps, renderItemStructure, supportFormItems } from './form-item';

export interface LabelConfig {
  width?: number;
}

export function renderLabel(
  FormItem: FormItemProps,
  labelConfig: LabelConfig = {},
  finalFormItemProps: renderItemStructure
) {
  const supports = Object.keys(supportFormItems);

  if (!FormItem.label) {
    return finalFormItemProps;
  }

  let props: any = {
    className: 'cf-form-label',
    style: {
      maxWidth: '48px',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  };

  if (labelConfig.width) {
    props.style = {
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    };
    props.className = '';
  }

  if (!supports.includes(FormItem.type)) {
    finalFormItemProps.label = <span {...props}>不支持</span>;
    finalFormItemProps.children = <div className={'unsupported-form-item'}>{`不支持的表单组件--${FormItem.type}`}</div>;
  } else {
    finalFormItemProps.label = <span {...props}>{FormItem.label}</span>;
  }

  return finalFormItemProps;
}
