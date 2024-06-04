'use client'
import { useEffect, useState } from 'react'
import { CHAIN_LINKS } from '@/config'
import Arrow from '../arrow'

interface ChainLink {
	id: number
	name: string
	src: string
}

export default function Chain() {
	const [visible, setVisible] = useState(false)
	const [chain, setChain] = useState<ChainLink>()

	useEffect(() => {
		const current = CHAIN_LINKS.find((chain) => chain.id === 6)
		setChain(current)
	}, [])

	const selectChain = (id: number) => {
		const selected = CHAIN_LINKS.find((chain) => chain.id === id)
		setChain(selected)
		setVisible(false)
	}

	return (
		<>
			<div className="relative">
				{chain?.src && (
					<div
						className="flex justify-center items-center gap-2 w-40 px-4 py-1 hover:w-60 transition-width duration-300 hover:bg-blue-700 hover:rounded  hover:cursor-pointer"
						onClick={() => setVisible(!visible)}
					>
						<picture>
							<img src={chain?.src} alt={chain?.name} className="w-4 h-4" />
						</picture>
						<div className="truncate">{chain?.name}</div>
						<Arrow visible={visible} />
					</div>
				)}

				{visible && (
					<div className="w-60 p-2 rounded absolute top-11 right-0 shadow-2xl bg-white text-neutral-500 text-sm">
						{CHAIN_LINKS.map((chain) => (
							<div
								key={chain.id}
								className="flex gap-2 p-1 rounded hover:bg-gray-100 hover:cursor-pointer"
								onClick={() => selectChain(chain.id)}
							>
								<picture>
									<img src={chain.src} alt={chain.name} className="w-4 h-4" />
								</picture>
								<span>{chain.name}</span>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	)
}
