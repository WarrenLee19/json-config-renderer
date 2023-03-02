import React from 'react';
import { Breadcrumb } from 'apusic-ui';
import APageHeader from '../../components/APageHeader';

interface HeaderProps {
  data: any;
  style?: any;
  onSearchClick?: Function;
  value?: any;
  rows?: any;
  menu?: any[];
}

function Header(props: HeaderProps) {
  const {
    data: { title, header },
    style,
    onSearchClick,
    value = [],
    rows
  } = props;

  if (!header) return <></>;
  return (
    <div className={'cf-page-header'} style={{ ...style }}>
      {header && header.breadcrumb ? (
        <div className={'header-breadcrumb'}>
          <img
            src="https://apusic-1251618686.cos.ap-guangzhou.myqcloud.com/icon/home.png"
            alt={'首页'}
            className={'page-header-logo'}
          />
          {/*<img src={'https://img.apusic.com/volume1/2,0159569ab9b9'} alt={"首页"} className={"page-header-logo"}/>*/}
          {header.breadcrumb.length > 0 &&
            header.breadcrumb.map((item: any, index: number) => {
              // @ts-ignore
              return (
                <Breadcrumb.Item key={index}>
                  {item.path ? (
                    <a href={item.path} style={{ color: '#999' }}>
                      {item.label}
                    </a>
                  ) : (
                    item.label
                  )}
                </Breadcrumb.Item>
              );
            })}
          {(header.breadcrumb === true || header.breadcrumb.length > 0) && title}
        </div>
      ) : null}
      <APageHeader title={title} header={header} value={value} rows={rows} onSearch={onSearchClick} />
    </div>
  );
}

export default Header;
