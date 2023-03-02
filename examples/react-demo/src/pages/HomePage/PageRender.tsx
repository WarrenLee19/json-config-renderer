import React from 'react' ;
import { Result } from 'apusic-ui';
import ControlPage from '../ControlPage';

interface TProps {
    activedSubPagePathName:string|null
    menuConfig:any[]
}

const SubPageRenderer = (props:TProps) => {
    const {
        activedSubPagePathName,menuConfig
    } = props;
    let item;
    if(menuConfig&& menuConfig.length>0) item = menuConfig.find((item:any)=>item.key === activedSubPagePathName )
    if(activedSubPagePathName&&item) {
        if(item.isControlPage){
            return (
                <ControlPage activedKey={activedSubPagePathName} menuConfig={menuConfig}/>
            ) ;
        }else{
            // const TheComponent = withProps({})(subPageMap[activedSubPagePathName]) ;
            // return (
            //     <TheComponent />
            // ) ;
        }

    }else{
        return (
            <Result
                status="404"
                title="404"
                subTitle="访问页面不存在."
            />
        ) ;
    }
}

export default SubPageRenderer ;
