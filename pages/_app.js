import '../styles/globals.scss';
import styles from '../styles/Home.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import NavBar from '../components/NavBar';
import { Roboto } from '@next/font/google';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { merge } from 'lodash';

import "@rainbow-me/rainbowkit/styles.css";
import {
  ConnectButton,
  themes,
  lightTheme,
  getDefaultWallets,
  RainbowKitProvider
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_API, priority: 0 }),
    infuraProvider({ apiKey: process.env.INFURA_API, priority: 1 }),
    publicProvider({ priority: 2 }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});



//------------------------rainbowkit----------------------------------

const myTheme = merge(lightTheme(), {
  colors: {
    accentColor: 'hsl(326, 100%, 80%)',
    connectButtonText: 'black',
    modalText: 'black',
    actionButtonBorder: 'solid black 2px',
    actionButtonBorderMobile: 'solid black 2px',
  },
});



//--------------------------------------------------------------------

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: 'hsl(235, 100%, 80%)',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});


//---------------------------------------------------------------

export default function App({ Component, pageProps }) {
  return( 
    <>

    <ThemeProvider theme={theme}>
      <Head>
        <title>pepethereum</title>
        <meta name="description" content="Dynamic On-Chain NFT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
        <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      </Head>
      <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider theme={myTheme} chains={chains} coolMode>
      
      <div className={styles.nav}>
        <NavBar />
      </div>
      <main className={roboto.className}>
  
        <Component {...pageProps} />

      </main>
      
      </RainbowKitProvider>
    </WagmiConfig>
    </ThemeProvider>
  

  </>

  
  
  
  )
}
