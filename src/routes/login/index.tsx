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

	// Dynamic labels based on selected user type
	const getEmailLabel = () => {
		switch (userType) {
			case "admin":
				return "Admin Email";
			case "faculty":
				return "Faculty Email";
			case "student":
				return "Student Email";
			default:
				return "Email Address";
		}
	};

	const getPasswordLabel = () => {
		switch (userType) {
			case "admin":
				return "Admin Password";
			case "faculty":
				return "Faculty Password";
			case "student":
				return "Student Password";
			default:
				return "Password";
		}
	};

	return (
		<div className="box-border bg-gradient-to-br from-blue-50 to-white min-h-screen">
			<h2 className="text-6xl text-center pt-20 text-black-800 font-bold">
				Login to Lab Management System
			</h2>

			<div className="flex items-center justify-center min-h-[80vh] px-6">
				<div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-10 border border-blue-200">
					<div className="mb-8">
						<div className="flex justify-center space-x-6 mb-8">
							{["faculty", "admin", "student"].map((type) => (
								<button
									key={type}
									className={`px-6 py-3 text-lg rounded-lg transition-colors ${
										userType === type ? "bg-blue-600 text-white" : "bg-gray-200"
									}`}
									onClick={() => setUserType(type)}
								>
									{type.charAt(0).toUpperCase() + type.slice(1)}
								</button>
							))}
						</div>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label className="block text-lg font-medium text-gray-700 mb-2">
								{getEmailLabel()}
							</label>
							<input
								type="email"
								name="email"
								required
								className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400"
								value={formData.email}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label className="block text-lg font-medium text-gray-700 mb-2">
								{getPasswordLabel()}
							</label>
							<input
								type="password"
								name="password"
								required
								className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400"
								value={formData.password}
								onChange={handleInputChange}
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-blue-600 text-white py-3 text-lg rounded-lg hover:bg-blue-700 transition-all shadow-md"
						>
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default RouteComponent;
