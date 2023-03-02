import { Dispatcher } from "cloud-flow";
import React from "react";
import DataSource from './config';
import './index.scss';

export default function Write() {
    return (
        <Dispatcher data={DataSource}/>
    );
}
