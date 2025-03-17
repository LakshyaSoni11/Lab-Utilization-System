import { createFileRoute, useRouter } from "@tanstack/react-router";
import React, { useState, ChangeEvent, FormEvent } from "react";

export const Route = createFileRoute("/login/")({
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();
	const [userType, setUserType] = useState<"faculty" | "admin" | "student">(
		"faculty",
	);

	const [formData, setFormData] = useState<{ email: string; password: string }>(
		{
			email: "",
			password: "",
		},
	);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Navigate based on user type
		switch (userType) {
			case "admin":
				router.navigate({ to: "/admin/dashboard" });
				break;
			case "faculty":
				router.navigate({ to: "/faculty/dashboard" });
				break;
			case "student":
				router.navigate({ to: "/students" });
				break;
			default:
				break;
		}
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
			<div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
				<h2 className="text-2xl font-bold text-center mb-6">
					Login to Lab Management System
				</h2>

				<div className="mb-6">
					<div className="flex justify-center space-x-4 mb-6">
						<button
							className={`px-4 py-2 rounded-lg transition-colors ${
								userType === "faculty"
									? "bg-blue-600 text-white"
									: "bg-gray-200"
							}`}
							onClick={() => setUserType("faculty")}
						>
							Faculty
						</button>
						<button
							className={`px-4 py-2 rounded-lg transition-colors ${
								userType === "admin" ? "bg-blue-600 text-white" : "bg-gray-200"
							}`}
							onClick={() => setUserType("admin")}
						>
							Admin
						</button>
						<button
							className={`px-4 py-2 rounded-lg transition-colors ${
								userType === "student"
									? "bg-blue-600 text-white"
									: "bg-gray-200"
							}`}
							onClick={() => setUserType("student")}
						>
							Student
						</button>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Email Address
						</label>
						<input
							type="email"
							name="email"
							required
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={formData.email}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Password
						</label>
						<input
							type="password"
							name="password"
							required
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={formData.password}
							onChange={handleInputChange}
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
}

export default RouteComponent;
