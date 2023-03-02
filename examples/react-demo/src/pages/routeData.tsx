/*--============================---
 *  子路由配置页
 *  cmq
 *--==============================*/

import React from 'react';
import ConfigPage from './Config';
import AllForm from './AllForm';
import OverviewPage from './overview';
import SimpleForm from './SimpleForm';
import resourceDetailData from './overview/resourceDetail';
import resourceData from './overview/resource';
import FetchPage from './overview/fetchPage';

type Tparams = {
    path: string,
    element: JSX.Element,
}

let routerData: Tparams[];

routerData = [
    { path: '/config', element : <ConfigPage /> },
    { path: '/all-form', element: <AllForm/>},
    { path: '/simple-form', element: <SimpleForm/>},
    { path: '/overview', element: <OverviewPage/>},
    { path: '/resource', element: <OverviewPage data={resourceData}/>},
    { path: '/resourceDetail', element: <OverviewPage data={resourceDetailData}/>},
    { path: '/fetchPage', element: <OverviewPage data={FetchPage}/>},
];

export default routerData;
