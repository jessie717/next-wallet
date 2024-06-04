export default function Arrow({ visible }: { visible: boolean }) {
	return (
		<>
			{visible ? (
				<span className="icon-[iconamoon--arrow-down-2-thin] text-2xl transition -rotate-180" />
			) : (
				<span className="icon-[iconamoon--arrow-down-2-thin] text-2xl transition -rotate" />
			)}
		</>
	)
}
