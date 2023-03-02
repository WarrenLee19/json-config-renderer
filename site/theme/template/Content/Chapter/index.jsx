import React from 'react';
import './index.scss';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import classnames from 'classnames';

function Chapter(props) {
    const name = props.name;
    const metas = props.metas;
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)

    return (
        <div className={"chapter-item"}>
            <div className={"chapter-category"}>{name}</div>
            {
                metas.map(({meta}, index) => {
                    const indexPath = meta.filename.lastIndexOf('/');
                    const path = meta.filename.substring(0, indexPath);
                    return <div key={index} className={classnames({"chapter-title-box": true, "chapter-active": `/${path}` === location.pathname})} onClick={() => {
                        navigate(`/${path}`);
                    }}>
                        <span className={"chapter-title"}>{meta.title}</span>
                        <span className={"chapter-subtitle"}>{meta.subtitle}</span>
                    </div>
                })
            }
        </div>
    );
}

function Overview(props) {
    const navigate = useNavigate();
    const metas = props.meta[0];

    const index = metas.meta.filename.lastIndexOf('/');
    const path = metas.meta.filename.substring(0, index);

    return (
        <div className={classnames({"chapter-title-box": true, "chapter-active": `/${path}` === location.pathname})} onClick={() => {
            if(metas.meta) {
                navigate(`/${path}`);
            }
        }}>
            <span className={"chapter-title"}>组件概览</span>
        </div>
    );
}

export default function Chapters(props) {
    let components = props.picked.components || [];

    // 处理category
    const categories = {

    };

    const overview = components.filter((comp) => {
        return comp.meta.type === 'Overview';
    });

    components = components.filter((comp) => {
        return comp.meta.type !== 'Overview';
    });

    components.map(component => {
       if(!categories[component.meta.type]) {
           categories[component.meta.type] = [component];
       } else {
           categories[component.meta.type].push(component);
       }
    });

    const elements = [];

    for(const key in categories) {
        elements.push(<Chapter name={key} metas={categories[key]} key={key}/>);
    }

    return <div className={"chapter-container"}>
        <Overview meta={overview}/>
        {elements}
    </div>
}
