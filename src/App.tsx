import React, { useState, useEffect, useRef, useCallback } from "react";
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
  height: 100%;
`;

const UnityStyled = styled(Unity)`
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
`;

function App() {
  const { network } = useTonConnect();
  const { unityProvider, isLoaded } = useUnityContext({
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
  const [showLoader, setShowLoader] = useState(true);

  const updateDevicePixelRatio = useCallback(() => {
    setDevicePixelRatio(window.devicePixelRatio);
  }, []);

  useEffect(() => {
    const mediaMatcher = window.matchMedia(`screen and (resolution: ${devicePixelRatio}dppx)`);
    mediaMatcher.addEventListener("change", updateDevicePixelRatio);

    return () => {
      mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
    };
  }, [devicePixelRatio, updateDevicePixelRatio]);

  const resizeCanvas = useCallback(() => {
    const canvas = document.querySelector("#unity-canvas") as HTMLCanvasElement;
    if (canvas) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }
  }, [devicePixelRatio]);

  useEffect(() => {
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [resizeCanvas]);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 2000); // Adjust delay time as needed (2 seconds here)

      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <StyledApp>
      <AppContainer>
        <TonConnectButton />
        <UnityContainer ref={unityContainerRef}>
          {showLoader && <Loading />}
          <UnityStyled unityProvider={unityProvider} devicePixelRatio={devicePixelRatio} id="unity-canvas" />
        </UnityContainer>
      </AppContainer>
    </StyledApp>
  );
}

export default App;
