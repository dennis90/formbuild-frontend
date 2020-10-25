import React from 'react';

import spinnerImage from './spinner.svg';

const Loader: React.FC = (props) => {
  return (
    <div>
      <img src={spinnerImage} alt="Loading"/>
    </div>
  );
};

export default Loader;
