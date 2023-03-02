require('@babel/polyfill');
const React = require('react');
const ReactDOM = require('react-dom');
const data = require(`react-json-renderer/scripts/doc_site/data`);
const routes = require('./routes.index.jsx')(data);
const { BrowserRouter, useRoutes } = require("react-router-dom");

function App(props) {
    let elements = useRoutes(routes);
    return (
        <div className="cf-app">
            {elements}
        </div>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
           <App/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
