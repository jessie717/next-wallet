import { TransactionResponse } from 'ethers/providers'

export default function History({
	address,
	transactions
}: {
	address: string
	transactions: Array<TransactionResponse>
}) {
	return (
		<>
			<div className="w-[640px]">
				<div className="font-bold my-2">
					<span className="text-2xl">钱包</span>: <span className=" text-red-600 ml-2">{address}</span>{' '}
				</div>
				<div className="text-sm underline underline-offset-4">历史交易记录</div>
				{transactions?.length ? (
					transactions.map((tx) => (
						<div
							key={tx.hash}
							className="flex flex-col w-[640px] border-2 border-orange-300 rounded shadow p-4 m-2 gap-1 hover:cursor-pointer hover:shadow-lg hover:border-orange-500"
						>
							<div className="flex items-center">
								<div className="font-bold w-14">Hash:</div>
								<div className="text-sm text-ellipsis">{tx.hash}</div>
							</div>
							<div className="flex items-center">
								<div className="font-bold w-14">From:</div>
								<div className="text-sm text-ellipsis">{tx.from}</div>
							</div>
							<div className="flex items-center">
								<div className="font-bold w-14">To:</div>
								<div className="text-sm text-ellipsis">{tx.to}</div>
							</div>
							<div className="flex items-center">
								<div className="font-bold w-14">Value:</div>
								<div className="text-sm text-ellipsis">{tx.value}</div>
							</div>
							<div className="flex items-center">
								<div className="font-bold w-14">Block:</div>
								<div className="text-sm text-ellipsis">{tx.blockNumber}</div>
							</div>
						</div>
					))
				) : (
					<div className="my-8 p-4  text-center text-slate-500 text-2xl rounded border shadow">No data.</div>
				)}
			</div>
		</>
	)
}
