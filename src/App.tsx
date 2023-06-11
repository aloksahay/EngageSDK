import {BrowserRouter as Router} from 'react-router-dom'
import Routes from './routes/CustomRoutes'
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


const App = () =>  {

  return (
    <WagmiConfig config={config}>
      <Router>
        <Routes/>
      </Router>
  </WagmiConfig>
  );
}

export default App;



