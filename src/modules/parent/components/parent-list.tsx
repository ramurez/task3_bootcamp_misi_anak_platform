import type { Parent } from "../types";
import ParentCard from "./parent-card";

interface ParentListProps {
	parents: Parent[];
}
export function ParentList({ parents }: ParentListProps) {
	return (
		<section className="rounded-3xl border border-emerald-800 bg-emerald-100 p-5 shadow-sm md:p-6">
			<div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
				<div>
					<h2 className="text-xl font-bold text-emerald-950">Parent List</h2>
					<p className="text-sm text-emerald-800">
						View and manage all registered parents.
					</p>
				</div>

				<span className="w-fit rounded-full px-4 py-2 text-sm font-bold text-emerald-950">
					Total : {parents.length} Parents
				</span>
			</div>

			{parents.length > 0 ? (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{parents.map((parent) => (
						<ParentCard key={parent.id} {...parent} />
					))}
				</div>
			) : (
				<div className="rounded-2xl border border-dashed border-emerald-700 bg-white/70 p-8 text-center">
					<p className="font-bold text-emerald-950">No parent data yet</p>
					<p className="mt-1 text-sm text-emerald-700">
						Add a new parent using the input form above.
					</p>
				</div>
			)}
		</section>
	);
}
