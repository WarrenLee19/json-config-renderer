import React, { useEffect } from "react";
import { Result } from 'apusic-ui';
import PageDataSource from "../../mock/pageConfig";
import {Dispatcher} from 'cloud-flow';

function Config (props:any){
    const { pageKey,pageState,fetchPageDataSource } = props;
    const { dataSource } = pageState;

    useEffect(()=>{
        if(pageKey){
            const info = PageDataSource.find((item:any)=> item.key === pageKey);

        }
    },[pageKey])

    if(!dataSource){
        return (
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
            />
        )
    }
    return(
        <>
            <Dispatcher data={dataSource}/>
        </>
    )
}

export default Config;
