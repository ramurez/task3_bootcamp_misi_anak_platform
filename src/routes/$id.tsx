import { createFileRoute, useRouter } from "@tanstack/react-router";
import { api } from "#/utils/api.ts";

export const Route = createFileRoute("/$id")({
	component: RouteComponent,
	loader: async ({ params }) => {
		const response = await api.parents[":id"].$get({
			param: {
				id: params.id,
			},
		});
		const data = await response.json();
		return data;
	},
});

function RouteComponent() {
	const router = useRouter();
	const parent = Route.useLoaderData() as {
		id?: string;
		name?: string;
		age?: number;
	} | null;
	if (!parent || Object.keys(parent).length === 0) {
		return <div>Data tidak ditemukan!!!</div>;
	}

	async function handleDeleteExistingParent(
		parentId: string,
		parentName: string,
	) {
		const confirmed = window.confirm(
			`Are you sure you want to delete ${parentName}?`,
		);

		if (!confirmed) {
			return;
		}

		try {
			await api.parents[":id"].$delete({
				param: {
					id: parentId,
				},
			});

			router.invalidate();
			await router.navigate({
				to: "/",
			});
		} catch (error) {
			console.error(error);
			alert("Failed to delete parent.");
		}
	}

	return (
		<div>
			<div
				key={parent.id}
				className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 shadow-sm"
			>
				<p className="text-xs font-bold uppercase tracking-wide text-emerald-600">
					Name
				</p>

				<p className="mt-1 text-lg font-bold text-emerald-950">{parent.name}</p>

				<p className="mt-3 text-xs font-bold uppercase tracking-wide text-emerald-600">
					Age
				</p>

				<p className="mt-1 text-sm font-semibold text-emerald-900">
					{parent.age} years old
				</p>
			</div>
			<div className="mt-5 flex justify-start">
				<button
					type="button"
					onClick={() =>
						handleDeleteExistingParent(parent.id as string, parent.name ?? "")
					}
					className="rounded-xl bg-red-100 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-200"
				>
					Delete Parent
				</button>
			</div>
		</div>
	);
}
