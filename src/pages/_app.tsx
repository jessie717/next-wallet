import { AppProps } from 'next/app'

import '../app/globals.css'

export default function _app({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}
