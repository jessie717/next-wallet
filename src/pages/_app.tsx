import { AppProps } from 'next/app'
import { WagmiProvider } from 'wagmi'
import { arbitrum, base, mainnet, optimism, polygon, sepolia, zora } from 'wagmi/chains'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import '@rainbow-me/rainbowkit/styles.css'
import '../app/globals.css'
import { argentWallet, ledgerWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets'

export default function _app({ Component, pageProps }: AppProps) {
	const config = getDefaultConfig({
		appName: 'next wallet app',
		projectId: '093a95c67b4bb1587e12c5d95848390e',
		chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
		wallets: [
			{
				groupName: 'Other',
				wallets: [argentWallet, trustWallet, ledgerWallet]
			}
		]
	})

	const client = new QueryClient()

	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={client}>
				<RainbowKitProvider>
					<Component {...pageProps} />
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	)
}
