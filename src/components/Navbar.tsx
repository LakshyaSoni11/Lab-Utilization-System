import React from "react";
import { Link } from "@tanstack/react-router";
// import { Button } from "./ui/button";
// import { Moon, Sun } from "lucide-react"
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
					{/* <Button variant="outline" size="icon">
						<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
						<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
						<span className="sr-only">Toggle theme</span>
					</Button> */}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
// import { Home, User, Briefcase, FileText } from 'lucide-react'
// import { NavBar } from './ui/tubelight-navbar'
// export function NavBarDemo() {
//   const navItems = [
//     { name: 'Home', url: '#', icon: Home },
//     { name: 'About', url: '#', icon: User },
//     { name: 'Projects', url: '#', icon: Briefcase },
//     { name: 'Resume', url: '#', icon: FileText }
//   ]

//   return <NavBar items={navItems} />
// }