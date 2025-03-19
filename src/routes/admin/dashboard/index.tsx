import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/footer";
import { toast, Toaster } from "sonner";
import { request } from "http";

interface LabRequest {
	id: number;
	facultyName: string;
	labType: string;
	subject: string;
	date: string;
	time: string;
	duration: number;
	status: "Pending" | "Approved" | "Rejected";
}

interface LabStatus {
	total: number;
	available: number;
}

interface LabStatusMap {
	[key: string]: LabStatus;
}
// useEffect(() => {
// 	const fetchLabReq = async () => {
// 		try {
// 			const response = await fetch("/api/labrequests");
// 			if (!response.ok) {
// 				throw new Error(`Failed to fetch lab requests: ${response.status}`);
// 			}
// 			const data = await response.json();
// 			setLabRequests(data);
// 		} catch (error) {
// 			console.error("Error fetching lab requests:", error);
// 		}
// 	};
// }, []);

export const Route = createFileRoute("/admin/dashboard/")({
	component: RouteComponent,
});

function RouteComponent(): JSX.Element {
	const [labRequests, setLabRequests] = useState<LabRequest[]>([
		{
			id: 1,
			facultyName: "Dr. Smith",
			labType: "Computer Lab",
			subject: "Programming",
			date: "2025-03-01",
			time: "10:00",
			duration: 2,
			status: "Pending",
		},
		{
			id: 2,
			facultyName: "Prof. Johnson",
			labType: "Hardware Lab",
			subject: "Electronics",
			date: "2025-03-05",
			time: "14:00",
			duration: 3,
			status: "Pending",
		},
	]);

	const [labStatus, setLabStatus] = useState<LabStatusMap>({
		computerLab: { total: 5, available: 3 },
		hardwareLab: { total: 3, available: 2 },
		chemicalLab: { total: 4, available: 4 },
		electricalLab: { total: 3, available: 1 },
		mechanicalLab: { total: 2, available: 2 },
	});

	const handleStatusChange = (
		requestId: number,
		newStatus: "Pending" | "Approved" | "Rejected",
	): void => {
		const requestUpdate = labRequests.find(
			(request) => request.id === requestId,
		);
		if (!requestUpdate) return;
		const labTypeKey = requestUpdate.labType
			.replace(/\s+/g, "")
			.replace(/^./, (char) => char.toLowerCase());
		if (newStatus == "Rejected") {
			setLabRequests(
				(
					requests, //here all requests whose id is not equal to id of rejected id will be removed and rest o the request will be shown
				) => requests.filter((request) => request.id != requestId),
			);
			toast.error(`Request for ${requestUpdate.labType} rejected Kindly book lab on the other slot`);
		} else {
			setLabRequests((requests) =>
				requests.map((request) =>
					request.id === requestId
						? { ...request, status: newStatus }
						: request,
				),
			);
			setLabStatus((prevStatus) => ({
				...prevStatus,
				[labTypeKey]: {
					...prevStatus[labTypeKey], // Correctly spreads the existing lab details
					available: Math.max(prevStatus[labTypeKey].available - 1, 0), // Accesses `available` property correctly
				},
			}));
			toast.success(`Lab request for  ${requestUpdate.labType} Approved`);
		}
	};
	return (
		<div className="min-h-screen bg-gray-50 ">
			<Navbar />
			<Toaster richColors/>
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-800 mb-8">
					Admin Dashboard
				</h1>

				{/* Lab Status Overview */}
				<div className="mb-8">
					<h2 className="text-xl font-semibold mb-4">Lab Status Overview</h2>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
						{Object.entries(labStatus).map(([lab, status]) => (
							<div key={lab} className="bg-white rounded-lg shadow-md p-4">
								<h3 className="font-medium mb-2">
									{lab.replace(/([A-Z])/g, " $1").trim()}
								</h3>
								<div className="space-y-1">
									<p className="text-sm">Total: {status.total}</p>
									<p className="text-sm">Available: {status.available}</p>
									<div className="w-full bg-gray-200 rounded-full h-2">
										<div
											className="bg-blue-600 h-2 rounded-full"
											style={{
												width: `${(status.available / status.total) * 100}%`,
											}}
										></div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Pending Requests */}
				<div className="bg-white rounded-lg shadow-lg p-6">
					<h2 className="text-xl font-semibold mb-4">Lab Requests Queue</h2>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="bg-gray-50">
									<th className="text-left p-4 border-b">Faculty</th>
									<th className="text-left p-4 border-b">Lab Type</th>
									<th className="text-left p-4 border-b">Subject</th>
									<th className="text-left p-4 border-b">Date & Time</th>
									<th className="text-left p-4 border-b">Duration</th>
									<th className="text-left p-4 border-b">Status</th>
									<th className="text-left p-4 border-b">Actions</th>
								</tr>
							</thead>
							<tbody>
								{labRequests.map((request) => (
									<tr key={request.id} className="border-b hover:bg-gray-50">
										<td className="p-4">{request.facultyName}</td>
										<td className="p-4">{request.labType}</td>
										<td className="p-4">{request.subject}</td>
										<td className="p-4">
											{request.date} at {request.time}
										</td>
										<td className="p-4">{request.duration}h</td>
										<td className="p-4">
											<span
												className={`px-3 py-1 rounded-full text-sm ${
													request.status === "Approved"
														? "bg-green-100 text-green-800"
														: request.status === "Rejected"
															? "bg-red-100 text-red-800"
															: "bg-yellow-100 text-yellow-800"
												}`}
											>
												{request.status}
											</span>
										</td>
										<td className="p-4">
											{request.status === "Pending" && (
												<div className="flex space-x-2">
													<button
														onClick={() =>
															handleStatusChange(request.id, "Approved")
														}
														className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
													>
														Approve
													</button>
													<button
														onClick={() =>
															handleStatusChange(request.id, "Rejected")
														}
														className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
													>
														Reject
													</button>
												</div>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
