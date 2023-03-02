import React, {useEffect, useState} from 'react';
import lodash from 'lodash';
import './index.scss';
import { useLocation } from 'react-router';
import Title from './Title';

export default function Markdown(props) {
    const markdown = props.data.components;
    const toReactComponent = props.utils.toReactComponent;
    const location = useLocation();

    const [component, setComponent] = useState('');
    const [meta, setMeta] = useState({});

    useEffect(() => {
        const pathname = location.pathname;
        const pathArr = pathname.split('/').filter(pathStr => pathStr).join('.');
        const content = lodash.get(markdown, pathArr)?.index?.content;
        const meta = lodash.get(markdown, pathArr)?.index?.meta;
        setMeta(meta);
        // console.log(lodash.get(markdown, pathArr))
        if(content) {
            const comp = toReactComponent(content);
            setComponent(comp);
        }
    }, [location]);

    return (<div className={"markdown"}>
        <Title meta={meta}/>
        {
            component
        }
    </div>);
}