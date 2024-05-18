import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "./hooks/useTonConnect";
import { Unity, useUnityContext } from "react-unity-webgl";
import Loading from "./game/loding";

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
  height: calc(100vh - 40px);
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
    loaderUrl: "buildUnity/WebGL.loader.js",
    dataUrl: "buildUnity/webgl.data",
    frameworkUrl: "buildUnity/build.framework.js",
    codeUrl: "buildUnity/build.wasm",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
      antialias: true,
    },
  });

  const unityContainerRef = useRef<HTMLDivElement | null>(null);
  const [devicePixelRatio, setDevicePixelRatio] = useState(window.devicePixelRatio);

  useEffect(() => {
    const updateDevicePixelRatio = () => {
      setDevicePixelRatio(window.devicePixelRatio);
    };

    const mediaMatcher = window.matchMedia(`screen and (resolution: ${devicePixelRatio}dppx)`);
    mediaMatcher.addEventListener("change", updateDevicePixelRatio);

    return () => {
      mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
    };
  }, [devicePixelRatio]);

  useEffect(() => {
    const handleResize = () => {
      if (unityContainerRef.current) {
        const canvas = unityContainerRef.current.querySelector("canvas");
        if (canvas) {
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <StyledApp>
      <AppContainer>
        <TonConnectButton />
        <UnityContainer ref={unityContainerRef}>
           <Loading />
          <UnityStyled unityProvider={unityProvider} devicePixelRatio={devicePixelRatio} />
        </UnityContainer>
      </AppContainer>
    </StyledApp>
  );
}

export default App;
