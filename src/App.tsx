import "./App.css";
import React from "react";
import { TonConnectButton } from "@tonconnect/ui-react";

import styled from "styled-components";
import { useTonConnect } from "./hooks/useTonConnect";
import "@twa-dev/sdk";
import { Unity, useUnityContext } from "react-unity-webgl";

import Loading from "./game/loding";
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
  margin-top: 20px;
  width: 100%;
  height: calc(100vh - 40px); /* Adjust this value as needed */
`;

const UnityStyled = styled(Unity)`
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
`;

function App() {
  const { network } = useTonConnect();
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "buildUnity/WebGl.loader.js",
    dataUrl: "buildUnity/webgl.data",
    frameworkUrl: "buildUnity/build.framework.js",
    codeUrl: "buildUnity/build.wasm",
  });

  return (
    <StyledApp>
      <AppContainer>
        <TonConnectButton />
        <UnityContainer>
          {!isLoaded && <Loading />}
          <UnityStyled unityProvider={unityProvider} />
        </UnityContainer>
      </AppContainer>
    </StyledApp>
  );
}

export default App;
