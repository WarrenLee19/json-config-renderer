import {useEffect, useState} from "react";
import { Result } from 'apusic-ui';
import PageDataSource from "../../mock/pageConfig";
import {Dispatcher} from 'cloud-flow';

function ControlPage (props:any){
    const { pageKey } = props;
    const [dataSource,setDataSource] = useState<any>({});

    useEffect(()=>{
        if(pageKey){
            const info = PageDataSource.find((item:any)=> item.key === pageKey);
            setDataSource(info);
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

export default ControlPage;
