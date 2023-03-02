import React from 'react';

const CheckedContext = React.createContext<any>({
  value: null,
  item: null
});

export default CheckedContext;
