import Link from 'next/link'

export default function Home() {
	return (
		<>
			<div className="flex flex-col items-center">
				<div className="w-full h-14  bg-blue-900 text-white">
					<div className="w-4/5 h-full m-auto flex justify-between items-center">
						<div>Next.js wallet</div>
						<div className="flex justify-end items-center gap-1">
							<div className="px-4 py-1 hover:bg-red-300 hover:rounded  hover:cursor-pointer hover:shadow ">Chain</div>
							<div className="px-4 py-1 hover:bg-red-300 hover:rounded  hover:cursor-pointer hover:shadow ">
								Connect wallet
							</div>
						</div>
					</div>
				</div>
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
