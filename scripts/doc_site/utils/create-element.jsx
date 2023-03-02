const React = require('react');

module.exports = function createElement(Component, props) {
  const { pathname, search, hash } = window.location;
  const dynamicPropsKey = pathname;
  if(!pathname) {
    return <Component {...props}/>;
  }
  return <Component {...props} {...Component[dynamicPropsKey]} />;
};
