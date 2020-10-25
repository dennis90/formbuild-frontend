import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import '../tailwind.output.css';

import Routes from './Routes';
import Header from 'components/Header';
import Providers from './Providers';

const App: React.FC = () => (
  <div className="container font-sans p-3 md:px-8">
    <BrowserRouter>
      <Providers>
        <Header/>
        <Routes/>
      </Providers>
    </BrowserRouter>
  </div>
);

export default App;
