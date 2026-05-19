import { Link } from "@tanstack/react-router";

interface ParentCardProps {
	id: number;
	name: string;
	age: number;
}

export default function ParentCard({ id, name, age }: ParentCardProps) {
	return (
		<Link to="/$id" params={{ id: String(id) }}>
			<div
				key={id}
				className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 shadow-sm"
			>
				<p className="text-xs font-bold uppercase tracking-wide text-emerald-600">
					Name
				</p>

				<p className="mt-1 text-lg font-bold text-emerald-950">{name}</p>

				<p className="mt-3 text-xs font-bold uppercase tracking-wide text-emerald-600">
					Age
				</p>

				<p className="mt-1 text-sm font-semibold text-emerald-900">
					{age} years old
				</p>
			</div>
		</Link>
	);
}
