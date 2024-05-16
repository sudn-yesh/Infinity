import React, { useState } from 'react';

function Game() {
  const [value, setValue] = useState(0);

  const increaseValue = () => {
    setValue(value + 1);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: '#007bff',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={increaseValue}
      >
        <p style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>{value}</p>
      </div>
    </div>
  );
}

export default Game;
