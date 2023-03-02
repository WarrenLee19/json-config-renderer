import React from 'react';
import Chapter from "./Chapter";
import './index.scss';
import { Outlet, useNavigate } from "react-router-dom";

export default function Content(props) {
    return (<div className={"app-content"}>
        <Chapter {...props}/>
        <div className={"subroute"}>
            <Outlet/>
        </div>
    </div>);
}
