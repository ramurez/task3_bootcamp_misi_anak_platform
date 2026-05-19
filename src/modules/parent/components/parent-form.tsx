import { useRouter } from "@tanstack/react-router";
import React from "react";
import { api } from "#/utils/api.ts";

export default function ParentForm() {
	const router = useRouter();
	const [newParentName, setNewParentName] = React.useState("");
	const [newParentAge, setNewParentAge] = React.useState(0);

	function handleChangeParentName(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		setNewParentName(value);
	}

	function handleChangeParentAge(e: React.ChangeEvent<HTMLInputElement>) {
		const value = parseInt(e.target.value, 10);
		setNewParentAge(Number.isNaN(value) ? 0 : value);
	}

	async function handleSaveNewParent() {
		if (!newParentName || newParentAge <= 0) {
			alert("Please enter a valid name and age for the new parent.");
			return;
		}

		// Send Data
		await api.parents.$post({
			json: {
				name: newParentName,
				age: newParentAge,
			},
		});

		api.auth.login.$post({});

		router.invalidate();
		setNewParentName("");
		setNewParentAge(0);
	}

	return (
		<section className="rounded-3xl border border-emerald-800 bg-emerald-100 p-5 shadow-sm">
			<form onSubmit={handleSaveNewParent} className="space-y-5">
				<div>
					<h2 className="text-xl font-bold text-emerald-950">Add New Parent</h2>
					<p className="mt-1 text-sm text-emerald-800">
						Input parent name and age to create a new parent profile.
					</p>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<label
							htmlFor="parentName"
							className="block text-sm font-semibold text-emerald-950"
						>
							Parent Name
						</label>

						<input
							id="parentName"
							type="text"
							value={newParentName}
							onChange={handleChangeParentName}
							placeholder="Example: Reza"
							required
							className="w-full rounded-2xl border border-emerald-300 bg-white px-4 py-3 text-emerald-950 outline-none transition focus:border-emerald-800 focus:ring-4 focus:ring-emerald-200"
						/>
					</div>

					<div className="space-y-2">
						<label
							htmlFor="parentAge"
							className="block text-sm font-semibold text-emerald-950"
						>
							Parent Age
						</label>

						<input
							id="parentAge"
							type="number"
							min={1}
							max={120}
							value={newParentAge === 0 ? "" : newParentAge}
							onChange={handleChangeParentAge}
							placeholder="Example: 35"
							required
							className="w-full rounded-2xl border border-emerald-300 bg-white px-4 py-3 text-emerald-950 outline-none transition focus:border-emerald-800 focus:ring-4 focus:ring-emerald-200"
						/>
					</div>
				</div>

				<div className="flex justify-end">
					<button
						className="w-full rounded-2xl bg-emerald-900 px-6 py-3 font-bold text-emerald-50 transition hover:bg-emerald-950 active:scale-[0.99] md:w-auto"
						type="submit"
					>
						Save New Parent
					</button>
				</div>
			</form>
		</section>
	);
}
