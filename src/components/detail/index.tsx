import React from 'react'

export default function Detail() {
	return (
		<>
			<div>
				<div>
					<div>
						<span>预估花费Gas:</span>
						<span>0.0000022</span>
					</div>

					<div>
						<span>最大可用Gas:</span>
						<span>0.0000022</span>
					</div>
				</div>

				<div>
					<div>共计:</div>
					<div>0.1</div>
				</div>

				<div className='my-2 flex justify-center gap-2'>
					<div className='px-8 py-1 border border-blue-500 rounded-2xl'>
						取消
					</div>
					<div className='px-8 py-1 border border-blue-500 rounded-2xl bg-blue-500 text-white'>
						确认
					</div>
				</div>
			</div>
		</>
	)
}
