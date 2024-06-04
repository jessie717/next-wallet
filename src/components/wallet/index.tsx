'use client'
import { useEffect, useState } from 'react'
import Arrow from '../arrow'
import { BrowserProvider, ethers } from 'ethers'
import { NEXT_WALLET_TOKEN } from '@/config'

// signer
// 1、getBalance 可以获取某个账号的链代币余额
// 2、getNetwork 可以获取当前链接的网络信息
// 3、getBlock 和 getBlockNumber获取区块信息
// 4、getResolver、getAvatar、resolveName、lookupAddress则是查询ENS域名相关方法
// 5、getTransaction、getTransactionResult、getTransactionReceipt、getTransactionCount则是用于查询交易相关信息。
// 6、getSigner、listAccounts 是BrowserProvider专有的，getSigner上面说过了。

export default function Wallet() {
	const [visible, setVisible] = useState(false)

	const [account, setAccount] = useState<string>()

	const requestAccounts = async (): Promise<string[]> => {
		return await window.ethereum.request({ method: 'eth_requestAccounts' })
	}

	useEffect(() => {
		// if (window.ethereum) {
		// 	window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts: string[]) => {
		// 		console.log('accounts :>> ', accounts)
		// 		accounts.length >= 1 && setAccount(accounts[0])
		// 	})
		// }
		const account = sessionStorage.getItem(NEXT_WALLET_TOKEN)
		account && setAccount(account)
	}, [])

	const connectWallet = async () => {
		if (window.ethereum) {
			const provider = new BrowserProvider(window.ethereum)
			const accounts = (await provider.send('eth_requestAccounts', [])) as string[]
			console.log('accounts :>> ', accounts)
			if (accounts.length > 0) {
				const [address] = accounts
				setAccount(address)
				sessionStorage.setItem(NEXT_WALLET_TOKEN, address)
			}
			// const signer = await provider.getSigner()
			// console.log('signer :>> ', signer)
			// const address = signer.address
		}
	}

	const showWallet = () => {
		setVisible(!visible)
	}

	return (
		<>
			{account ? (
				<div
					className="flex items-center gap-1 px-4 py-1 w-32 hover:w-[420px] transition-width duration-300 hover:bg-blue-700 hover:rounded  hover:cursor-pointer hover:shadow"
					onClick={() => showWallet()}
				>
					<span className="icon-[system-uicons--wallet]" />
					<div className="text-sm truncate">{account}</div>
					<Arrow visible={visible} />
				</div>
			) : (
				<div
					className="flex items-center gap-1 px-4 py-1 hover:bg-blue-700 hover:rounded  hover:cursor-pointer hover:shadow"
					onClick={() => connectWallet()}
				>
					<span className="icon-[system-uicons--wallet]" />
					Connect wallet
				</div>
			)}
		</>
	)
}
