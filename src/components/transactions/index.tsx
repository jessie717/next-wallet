'use client'
import { useState } from 'react'
import { BrowserProvider, TransactionResponse } from 'ethers/providers'
import { parseEther } from 'ethers/utils'

import { API_KEY, NEXT_WALLET_TOKEN, SEPOLIA_BASE_URL } from '@/config'
import Loading from '@/components/loading'
import History from '@/components/transactions/history'

export default function Transactions() {
	const [loading, setLoading] = useState(false)
	const [transactions, setTransactions] = useState<TransactionResponse[]>([])
	const [wallet, setWallet] = useState<string>('')

	const sendTransaction = async () => {
		if (typeof window.ethereum !== 'undefined') {
			const provider = new BrowserProvider(window.ethereum)
			const signer = await provider.getSigner()
			console.log('signer :>> ', signer);
			const tx = await signer.sendTransaction({
				to: '0x6F97B5f0aE454C72d883B535DA1761A7348B77c7',
				value: parseEther('0.01')
			})
			console.log('tx :>> ', tx);
			const receipt = await tx.wait()
			console.log('receipt :>> ', receipt);
		}
	}

	const getTransactions = async () => {
		setLoading(true)
		const address = sessionStorage.getItem(NEXT_WALLET_TOKEN)
		// TODO: 查询交易
		// const provider = new BrowserProvider(window.ethereum)
		// const tx = await provider.getTransaction('0xx6F97B5f0aE454C72d883B535DA1761A7348B77c7')
		// console.log('tx :>> ', tx);

		const url = `${SEPOLIA_BASE_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${API_KEY}`
		const res = await fetch(url)
		const data = await res.json()
		console.log('data :>> ', data);
		setTransactions(data.result as TransactionResponse[])
		setWallet(address as string)
		setLoading(false)
	}

	return (
		<>
			<div className="flex gap-2 m-2">
				<div className="flex items-center gap-1 px-4 py-1 rounded bg-blue-200  hover:bg-blue-400  hover:cursor-pointer hover:shadow" onClick={() => sendTransaction()}>
					发起交易
				</div>
				<div
					className="flex items-center gap-1 px-4 py-1 rounded bg-blue-200  hover:bg-blue-400  hover:cursor-pointer hover:shadow"
					onClick={() => getTransactions()}
				>
					查询交易记录
				</div>
			</div>

			{loading ? <Loading /> : <History address={wallet} transactions={transactions} />}
		</>
	)
}
