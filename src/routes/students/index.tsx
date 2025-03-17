import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
export const Route = createFileRoute("/students/")({
	component: RouteComponent,
});

function RouteComponent() {
	const upcomingLabs = [
		{
			id: 1,
			subject: "Programming Lab",
			faculty: "Dr. Smith",
			labType: "Computer Lab",
			date: "2025-03-01",
			time: "10:00-12:00",
			room: "Lab 101",
		},
		{
			id: 2,
			subject: "Electronics Lab",
			faculty: "Prof. Johnson",
			labType: "Hardware Lab",
			date: "2025-03-05",
			time: "14:00-17:00",
			room: "Lab 203",
		},
	];

	const schedule = [
		{
			day: "Monday",
			labs: ["Programming Lab (10:00-12:00)", "Electronics (14:00-16:00)"],
		},
		{ day: "Tuesday", labs: ["Digital Logic (09:00-11:00)"] },
		{ day: "Wednesday", labs: ["Circuit Design (13:00-15:00)"] },
		{ day: "Thursday", labs: ["Microprocessors (10:00-12:00)"] },
		{ day: "Friday", labs: ["Network Lab (15:00-17:00)"] },
	];

	return (
		<div className="min-h-screen bg-gray-50 ">
			<Navbar />
			<div className="max-w-6xl mx-auto mt-10">
				<h1 className="text-3xl font-bold text-gray-800 mb-8">
					Student Dashboard
				</h1>

				{/* Upcoming Labs */}
				<div className="bg-white rounded-lg shadow-lg p-6 mb-8">
					<h2 className="text-xl font-semibold mb-4">Upcoming Lab Sessions</h2>
					<div className="space-y-4">
						{upcomingLabs.map((lab) => (
							<div
								key={lab.id}
								className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow"
							>
								<div className="flex justify-between items-start mb-2">
									<div>
										<h3 className="font-medium text-lg">{lab.subject}</h3>
										<p className="text-gray-600">Faculty: {lab.faculty}</p>
									</div>
									<span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
										{lab.labType}
									</span>
								</div>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-sm">
									<div>
										<span className="text-gray-600">Date:</span>
										<p className="font-medium">{lab.date}</p>
									</div>
									<div>
										<span className="text-gray-600">Time:</span>
										<p className="font-medium">{lab.time}</p>
									</div>
									<div>
										<span className="text-gray-600">Room:</span>
										<p className="font-medium">{lab.room}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Weekly Schedule */}
				<div className="bg-white rounded-lg shadow-lg p-6">
					<h2 className="text-xl font-semibold mb-4">Weekly Lab Schedule</h2>
					<div className="space-y-4">
						{schedule.map((day, index) => (
							<div
								key={index}
								className="flex border-b last:border-b-0 pb-4 last:pb-0"
							>
								<div className="w-32 font-medium">{day.day}</div>
								<div className="flex-1">
									{day.labs.length > 0 ? (
										<ul className="space-y-2">
											{day.labs.map((lab, labIndex) => (
												<li key={labIndex} className="bg-gray-50 p-2 rounded">
													{lab}
												</li>
											))}
										</ul>
									) : (
										<p className="text-gray-500 italic">No labs scheduled</p>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
