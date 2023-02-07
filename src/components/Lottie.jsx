import React from 'react';
import { useLottie } from 'lottie-react';

const App = ({ animData }) => {
  const options = {
    animationData: animData,
    loop: true,
  };

  const { View } = useLottie(options);

  return <div style={{ width: '15rem', margin: 'auto', marginBottom: '-50px' }}>{View}</div>;
};

export default App;
