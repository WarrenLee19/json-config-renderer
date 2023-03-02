import * as React from 'react';
import { Empty } from 'apusic-ui';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

const renderEmpty = (componentName?: string): React.ReactNode =>
  <ConfigConsumer>
    {(props: ConfigConsumerProps) => {
      switch (componentName) {
      case 'Table':
      case 'List':
        return <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} />;

      case 'Select':
      case 'TreeSelect':
      case 'Cascader':
      case 'Transfer':
      case 'Mentions':
        return <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} />;
      default:
        return <Empty />;
      }
    }}
  </ConfigConsumer>
;

export type RenderEmptyHandler = typeof renderEmpty;

export default renderEmpty;
