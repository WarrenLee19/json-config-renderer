import React from 'react';
import Layout from '../Layout';
import NotFoundImage from '../../static/images/NotFound.png';
import './index.scss';

export default function NotFound() {
    return (
        <Layout>
            <div className="not-found">
                <img src={NotFoundImage} />
            </div>;
        </Layout>
    );
}
