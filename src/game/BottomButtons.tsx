import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function ButtonNav() {
  return (
    <div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <a href="/">
          <button>Exchange</button>
        </a>
        <a href="/pages/Mine">
          <button>Mine</button>
        </a>
        <a href="/pages/Friends">
          <button>Friends</button>
        </a>
        <a href="/pages/Earn">
          <button>Earn</button>
        </a>
        <a href="/pages/Airdrop">
          <button>Airdrop</button>
        </a>
      </div>
    </div>
  );
}

export default ButtonNav;
