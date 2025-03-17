import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import Footer from "../../../components/footer";
import Navbar from "../../../components/Navbar";

export const Route = createFileRoute("/faculty/dashboard/")({
	component: RouteComponent,
});

interface LabRequest {
	labType: string;
	subject: string;
	date: string;
	time: string;
	duration: string;
	description: string;
}

interface Request {
	id: number;
	labType: string;
	status: string;
	date: string;
	duration: string;
}

function RouteComponent(): JSX.Element {
	const [labRequest, setLabRequest] = useState<LabRequest>({
		labType: "",
		subject: "",
		date: "",
		time: "",
		duration: "",
		description: "",
	});

	const [requests, setRequests] = useState<Request[]>([]);

	const totalTime = (time: string, duration: string): string => {
		let [hours, minutes] = time.split(":").map(Number);
		let totMin = minutes + hours * 60 + parseInt(duration) * 60;
		let newHour = Math.floor(totMin / 60) % 24;
		let newMin = totMin % 60;
		return `${newHour.toString().padStart(2, "0")}:${newMin.toString().padStart(2, "0")}`;
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Lab request submitted:", labRequest);
		const newRequest: Request = {
			id: requests.length + 1,
			labType: labRequest.labType,
			status: "Pending",
			date: labRequest.date,
			duration: `${labRequest.time} to ${totalTime(labRequest.time, labRequest.duration)}`,
		};
		await fetch("/api/lab-requests.ts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newRequest),
		});
		setRequests((prevRequests) => [...prevRequests, newRequest]);
	};

	return (
		<div className="min-h-screen bg-gray-50 ">
			<Navbar />
			<div className="max-w-6xl mx-auto mt-10">
				<h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
					Faculty Dashboard
				</h1>

				<div className="grid md:grid-cols-2 gap-6">
					{/* Lab Request Form */}
					<div className="bg-white rounded-lg shadow-lg p-6">
						<h2 className="text-xl font-semibold mb-4">Request Lab Access</h2>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Lab Type
								</label>
								<select
									className="w-full px-3 py-2 border border-gray-300 rounded-lg"
									value={labRequest.labType}
									onChange={(e) =>
										setLabRequest({ ...labRequest, labType: e.target.value })
									}
								>
									<option value="">Select Lab Type</option>
									<option value="computer">Computer Lab</option>
									<option value="hardware">Hardware Lab</option>
									<option value="chemical">Chemical Lab</option>
									<option value="electrical">Electrical Lab</option>
									<option value="mechanical">Mechanical Lab</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Subject
								</label>
								<input
									type="text"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg"
									value={labRequest.subject}
									onChange={(e) =>
										setLabRequest({ ...labRequest, subject: e.target.value })
									}
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Date
									</label>
									<input
										type="date"
										className="w-full px-3 py-2 border border-gray-300 rounded-lg"
										value={labRequest.date}
										onChange={(e) =>
											setLabRequest({ ...labRequest, date: e.target.value })
										}
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Time
									</label>
									<input
										type="time"
										className="w-full px-3 py-2 border border-gray-300 rounded-lg"
										value={labRequest.time}
										onChange={(e) =>
											setLabRequest({ ...labRequest, time: e.target.value })
										}
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Duration (hours)
								</label>
								<input
									type="number"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg"
									value={labRequest.duration}
									onChange={(e) =>
										setLabRequest({ ...labRequest, duration: e.target.value })
									}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Description
								</label>
								<textarea
									className="w-full px-3 py-2 border border-gray-300 rounded-lg"
									rows={3}
									value={labRequest.description}
									onChange={(e) =>
										setLabRequest({
											...labRequest,
											description: e.target.value,
										})
									}
								></textarea>
							</div>

							<button
								type="submit"
								className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors"
							>
								Submit Request
							</button>
						</form>
					</div>

					{/* Request Status */}
					<div className="bg-white rounded-lg shadow-lg p-6">
						<h2 className="text-2xl font-bold text-center mb-7">My Requests</h2>
						<div className="space-y-4">
							{requests.map((request) => (
								<div key={request.id} className="p-4 bg-gray-50 rounded-lg">
									<div className="flex justify-between items-center mb-2">
										<h3 className="font-medium">{request.labType}</h3>
										<span
											className={`px-3 py-1 rounded-full text-sm ${
												request.status === "Approved"
													? "bg-green-100 text-green-800"
													: "bg-yellow-100 text-yellow-800"
											}`}
										>
											{request.status}
										</span>
									</div>
									<p className="text-sm text-gray-600">Date: {request.date}</p>
									<p className="text-sm text-gray-600">
										Time-Slot: {request.duration}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default RouteComponent;
