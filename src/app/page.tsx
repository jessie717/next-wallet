import Link from 'next/link'

export default function Home() {
	return (
		<>
			<div className='flex flex-col items-center'>
				<div className='font-bold text-3xl'>Next.js wallet</div>
				<Link href='/wallet'>
					<span className='underline hover:text-orange-500'>wallet</span>
				</Link>
				<Link href='/test'>
					<span className='underline hover:text-orange-500'>test</span>
				</Link>
			</div>
		</>
	)
}
