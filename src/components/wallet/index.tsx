'use client'
import { useEffect, useState } from 'react'
import Arrow from '../arrow'
import { BrowserProvider } from 'ethers'
import { NEXT_WALLET_TOKEN } from '@/config'

// signer
// 1、getBalance 可以获取某个账号的链代币余额
// 2、getNetwork 可以获取当前链接的网络信息
// 3、getBlock 和 getBlockNumber获取区块信息
// 4、getResolver、getAvatar、resolveName、lookupAddress则是查询ENS域名相关方法
// 5、getTransaction、getTransactionResult、getTransactionReceipt、getTransactionCount则是用于查询交易相关信息。
// 6、getSigner、listAccounts 是BrowserProvider专有的，getSigner上面说过了。

export default function Wallet() {
	const [account, setAccount] = useState<string | null>(null)
	const [balance, setBalance] = useState<bigint | null>(null)

	const [provider, setProvider] = useState<BrowserProvider | null>(null)

	const [visible, setVisible] = useState(false)

	useEffect(() => {
		if (typeof window.ethereum !== 'undefined') {
			const provider = new BrowserProvider(window.ethereum)
			setProvider(provider)

			// 刷新后走storage读取
			const storedAccount = sessionStorage.getItem(NEXT_WALLET_TOKEN)
			if (storedAccount) {
				setAccount(storedAccount)
				getBalance(provider, storedAccount)
			}

			// 监听ethereum的几个事件
			window.ethereum.on('accountsChanged', onAccountsChanged)
			window.ethereum.on('connect', onConnect)
			window.ethereum.on('disconnect', onDisconnect)
		}
		return () => {
			if (window.ethereum) {
				window.ethereum.removeListener('accountsChanged', onAccountsChanged)
				window.ethereum.removeListener('connect', onConnect)
				window.ethereum.removeListener('disconnect', onDisconnect)
			}
		}
	}, [])

	const onAccountsChanged = (accounts: string[]) => {
		if (accounts.length > 0) {
			const [account] = accounts
			setAccount(account)
			getBalance(provider, account)
			sessionStorage.setItem(NEXT_WALLET_TOKEN, account)
		} else {
			setAccount(null)
			setBalance(null)
			sessionStorage.removeItem(NEXT_WALLET_TOKEN)
		}
	}
	const onConnect = (info: any) => {
		console.log('info :>> ', info)
	}
	const onDisconnect = () => {
		console.log('disconnect :>> ')
	}

	const connectWallet = async () => {
		if (provider) {
			try {
				await provider.send('eth_requestAccounts', [])
				// signer.address
				// signer.getAddress()
				// 初始化
				const signer = await provider.getSigner()
				const account = await signer.getAddress()
				setAccount(account)
				getBalance(provider, account)
				sessionStorage.setItem(NEXT_WALLET_TOKEN, account)
			} catch (error) {
				console.error('error :>> ', error)
			}
		}
	}

	const getBalance = async (provider: BrowserProvider | null, account: string) => {
		if (provider) {
			const balance = await provider.getBalance(account)
			console.log('balance :>> ', balance)
			setBalance(balance)
		}
	}

	const showWallet = () => {
		setVisible(!visible)
	}

	return (
		<>
			{account ? (
				<div className="relative">
					<div
						className="flex items-center gap-1 px-4 py-1 w-32 hover:w-[420px] transition-width duration-300 hover:bg-blue-700 hover:rounded  hover:cursor-pointer hover:shadow"
						onClick={() => showWallet()}
					>
						<span className="icon-[system-uicons--wallet]" />
						<div className="text-sm truncate">{account}</div>
						<Arrow visible={visible} />
					</div>

					<div className="absolute right-0 top-11 w-80 p-4 rounded shadow-2xl text-sm text-zinc-800">
						<div className="flex flex-col justify-center gap-2 p-2 bg-slate-100">
							<div className="">Connected with Metamask</div>
							<div className="w-40 truncate">{account}</div>
							<div>ETH: {balance}</div>
						</div>
					</div>
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
