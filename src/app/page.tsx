// import Link from 'next/link'
import Chain from '@/components/chain'
import Wallet from '@/components/wallet'
import Transactions from '@/components/transactions'

export default function Home() {
	return (
		<>
			<div className="flex flex-col items-center">
				<div className="w-full h-14  bg-blue-900 text-white">
					<div className="w-4/5 h-full m-auto flex justify-between items-center">
						<div>Next.js wallet</div>
						<div className="flex justify-end items-center gap-1">
							<Chain />
							<Wallet />
						</div>
					</div>
				</div>
				<Transactions />
				{/* <Link href='/wallet'>
					<span className='underline hover:text-orange-500'>wallet</span>
				</Link>
				<Link href='/test'>
					<span className='underline hover:text-orange-500'>test</span>
				</Link> */}
			</div>
		</>
	)
}
