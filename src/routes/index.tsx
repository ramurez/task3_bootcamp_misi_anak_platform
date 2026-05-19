import { createFileRoute } from "@tanstack/react-router";
import ParentForm from "#/modules/parent/components/parent-form.tsx";
import { ParentList } from "#/modules/parent/components/parent-list.tsx";
import { api } from "#/utils/api.ts";

export const Route = createFileRoute("/")({
	component: Home,
	loader: async () => {
		const response = await api.parents.$get();
		const data = await response.json();
		return data;
	},
});
function Home() {
	const parents = Route.useLoaderData();

	return (
		<main className="min-h-screen bg-emerald-50">
			<section className="mx-auto w-full max-w-6xl px-4 py-6">
				<header className="flex flex-col gap-4 rounded-3xl border border-emerald-100 bg-white/90 p-5 shadow-sm md:flex-row md:items-center md:justify-between">
					<div>
						<h1 className="text-2xl font-bold text-emerald-950">Misi Anak</h1>
						<p className="mt-1 text-sm text-emerald-700">
							Manage parents, children, and mission configuration.
						</p>
					</div>

					<nav className="flex flex-wrap gap-3">
						<button
							type="button"
							className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-200"
						>
							Parents
						</button>

						<button
							type="button"
							className="rounded-full px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
						>
							Childs
						</button>

						<button
							type="button"
							className="rounded-full px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
						>
							Configuration
						</button>
					</nav>
				</header>

				<section className="mt-6">
					<ParentForm />
				</section>

				<section className="mt-6">
					<ParentList parents={parents} />
				</section>
			</section>
		</main>
	);
}
