import React, { useCallback, useState } from 'react';
import { Layout } from 'apusic-ui';
import PageHeader from './header';
import Dispatcher from '../dispatcher';

const { Content, Sider } = Layout;

async function handleInitData() {

}

interface TProps {
  data: any;
  menu?: any;
}

export default function PageRenderer(props: TProps) {
  const { data, menu = [] } = props;
  const { type, header, aside, body, initApi } = data;
  const [searchParams, setSearchParams] = useState<any>({});
  const [selectKeys, setSelectKeys] = useState<any>([]);
  const [selectRows, setSelectRows] = useState<any>([]);
  const [axiosData, setAxiosData] = useState([]);

  const handleSearchClick = useCallback(
    (obj: any = { reload: true }) => {
      setSearchParams(obj);
    },
    [searchParams]
  );

  const handleSelect = useCallback(
    (keys?: any, rows?: any) => {
      setSelectKeys(keys);
      setSelectRows(rows);
    },
    [selectKeys, selectRows]
  );

  const getHeight = () => {
    let height = 0;
    if (data.header) {
      height = 52;
      if (data.header.breadcrumb) height += 36;
      // TODO 这里不准确，可能不只一行bulkActions，后期还需要改动
      if (data?.header?.bulkActions?.length) height += 36;
    }
    return 'calc(100% - ' + height + 'px)';
  };

  return (
    <div className={'cf-page-container'}>
      <PageHeader {...props} onSearchClick={handleSearchClick} menu={menu} value={selectKeys} rows={selectRows} />
      <Layout className='cf-page-site-layout' style={{ minHeight: getHeight() }}>
        <Sider
          width={aside?.width || 200}
          style={{ display: aside ? '' : 'none', padding: '20px', background: '#fff' }}
        >
          <h4>{aside?.title || ''}</h4>
          <div>{aside?.content || ''}</div>
          {aside?.body && <Dispatcher data={aside.body} onSelect={handleSelect} />}
          {/*{ aside?.container && <Dispatcher data={aside.body} onSelect={handleSelect} /> }*/}
        </Sider>
        <Content className={'cf-page-body'}>
          {body && <Dispatcher data={body} fetchData={axiosData} searchParams={searchParams} onSelect={handleSelect} />}
        </Content>
      </Layout>
    </div>
  );
}
