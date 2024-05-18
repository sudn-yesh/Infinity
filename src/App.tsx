import "./App.css";
import React from "react";
import { TonConnectButton } from "@tonconnect/ui-react";

import { Counter } from "./components/Counter";
import { Jetton } from "./components/Jetton";
import { TransferTon } from "./components/TransferTon";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import Game from "./game/home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Unity, useUnityContext } from "react-unity-webgl";


import Page1 from './pages/Mine';
import Page2 from './pages/Friends';
import Page3 from './pages/Earn';
import Page4 from './pages/Airdrop';
import Page5 from './pages/Mine';

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const UnityContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh; /* Adjust this value as needed */
  margin-top: 20px;
`;

function Exchange() {
  return <Game />;
}

function Mine() {
  return <h2>Mine Page</h2>;
}

function Friends() {
  return <h2>Friends Page</h2>;
}

function Earn() {
  return <h2>Earn Page</h2>;
}

function Airdrop() {
  return <h2>Airdrop Page</h2>;
}

function ButtonNav() {
  return (
    <div style={{ position: 'fixed', bottom: 0, width: '100%', background: '#fff', padding: '10px', borderTop: '1px solid #ccc' }}>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
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
        <a href="/pages/ads">
          <button>Airdrop</button>
        </a>
      </div>
    </div>
  );
}

function App() {
  const { network } = useTonConnect();
  const { unityProvider } = useUnityContext({
    loaderUrl: "buildUnity/WebGl.loader.js",
    dataUrl: "buildUnity/webgl.data",
    frameworkUrl: "buildUnity/build.framework.js",
    codeUrl: "buildUnity/build.wasm",
  });

  return (
    <Router>
      <StyledApp>
        <AppContainer>
          <FlexBoxCol>
            <TonConnectButton />
          </FlexBoxCol>
        </AppContainer>
        <UnityContainer>
          <Unity unityProvider={unityProvider} style={{ width: '100%', height: '100%' }} />
        </UnityContainer>
      </StyledApp>
    </Router>
  );
}

export default App;
