import React, { useState, useEffect, CSSProperties } from 'react';

const Loading: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 5 seconds

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.loadingBarContainer}>
        <div style={styles.loadingBar}></div>
      </div>
      <p style={styles.loadingText}>Loading...</p>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#111111',
    position: 'fixed',
    top: 0,
    left: 0,
  },
  loadingBarContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: '5px',
    overflow: 'hidden',
    marginBottom: '10px',
  },
  loadingBar: {
    width: '100%',
    height: '10px',
    backgroundColor: '#1B8ADC',
    animation: 'loading 5s linear',
  },
  loadingText: {
    fontSize: '24px',
    fontStyle: 'bold',
    color: 'white',
  },
};

// CSS keyframes for the loading bar animation
const stylesGlobal = document.createElement('style');
stylesGlobal.innerHTML = `
  @keyframes loading {
    from { width: 0%; }
    to { width: 100%; }
  }
`;
document.head.appendChild(stylesGlobal);

export default Loading;
