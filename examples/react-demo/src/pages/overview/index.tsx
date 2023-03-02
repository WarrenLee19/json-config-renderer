import React from "react";
import {Dispatcher} from "cloud-flow";
import DataSource from './pageData';

const Index=(props: any)=> {
    return (
        <Dispatcher data={props && props.data ? props.data:DataSource}/>
    );
}

export default Index;
