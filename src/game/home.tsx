import React, { useState, useEffect } from 'react';
import ButtonNav from './BottomButtons';

function Game() {
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem('gameValue');
    return savedValue !== null ? JSON.parse(savedValue) : 0;
  });

  useEffect(() => {
    localStorage.setItem('gameValue', JSON.stringify(value));
  }, [value]);

  const increaseValue = () => {
    setValue(value + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '90vh', position: 'relative' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
      {/* <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <ButtonNav />
      </div> */}
    </div>

  );
}

export default Game;
