import React from 'react';
import './App.css';
import Pages from './pages';
import { ConfigProviderGlobal } from 'cloud-flow';
import 'cloud-flow/dist/style.css';

function App() {
  return (
    <ConfigProviderGlobal>
      <Pages />
    </ConfigProviderGlobal>
  );
}

export default App;
