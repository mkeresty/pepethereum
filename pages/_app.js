import '../styles/globals.scss';
import styles from '../styles/Home.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import NavBar from '../components/NavBar';
import { Roboto } from '@next/font/google';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme,
  lightTheme,
  Theme,
  connectorsForWallets,
  wallet,
  AvatarComponent,
} from '@rainbow-me/rainbowkit';
import { chain, createClient, configureChains, WagmiConfig, mainnet } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { merge } from 'lodash';


//------------------------rainbowkit----------------------------------

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()],
)

const { wallets } = getDefaultWallets({
  appName: 'pepethereum',
  chains,
});

const demoAppInfo = {
  appName: 'pepethereum',
};

const { connectors } = getDefaultWallets({
  appName: 'pepethereum',
  chains
});



const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})


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
      <WagmiConfig client={client}>
      <RainbowKitProvider theme={myTheme} appInfo={demoAppInfo} chains={chains} coolMode>
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
      
      <div className={styles.nav}>
        <NavBar />
      </div>
      <main className={roboto.className}>
  
        <Component {...pageProps} />

      </main>
      </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  

  </>

  
  
  
  )
}
