import React, {useEffect, useState} from 'react';
import './index.scss';

export default function Title(props) {
    const {meta} = props;
    return (
        <div className={"markdown-title"}>
            <div className={"title"}>{meta.title}</div>
            <div className={"subtitle"}>{meta.subtitle}</div>
        </div>
    )
}