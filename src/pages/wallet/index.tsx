import Detail from '@/components/detail'

export default function wallet() {
	return (
		<>
			<div className='text-black'>
				<div className='p-2 bg-black text-white flex justify-between'>
					<div>
						<span>当前账户余额:</span>
						<div>
							1000 <span>ETH</span>
						</div>
					</div>
					<div>
						network: <span>goerli</span>
					</div>
				</div>

				<div className='px-2 my-2'>
					<div className='text-3xl my-2'>转账</div>
					<div className='my-1'>钱包地址:</div>
					<div className='border border-orange-500 rounded px-2 my-2'>
						0x24xwuh0x24xwuh0x24xwuh0x24xwuh
					</div>
					<div className='my-1'>转账金额:</div>
					<input
						type='text'
						className='w-full border border-orange-500 rounded'
					/>
					<div className='my-1 rounded-xl bg-black text-white text-center font-bold p-2 '>
						转账
					</div>
				</div>

				<Detail />
			</div>
		</>
	)
}
