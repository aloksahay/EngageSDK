import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import  {WagmiConfig, createConfig, configureChains } from 'wagmi'
import { polygonMumbai } from "viem/chains";
import { publicProvider } from 'wagmi/providers/public'


const { publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <WagmiConfig config={config}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </WagmiConfig>
);
