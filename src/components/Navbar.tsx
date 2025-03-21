import React from "react";
import { Link } from "@tanstack/react-router";

const Navbar = () => {
	return (
		<nav className="shadow-lg text-black-800 text-lg p-4 ">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-xl font-bold">Lab Management</h1>
				<div className="space-x-4">
					<Link to="/" className="hover:text-gray-200">
						Home
					</Link>
					<Link to="/login" className="hover:text-gray-200">
						Login
					</Link>
					<Link to="/admin/dashboard" className="hover:text-gray-200">
						Admin
					</Link>
					<Link to="/faculty/dashboard" className="hover:text-gray-200">
						Faculty
					</Link>
					<Link to="/students" className="hover:text-gray-200">
						Student
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
