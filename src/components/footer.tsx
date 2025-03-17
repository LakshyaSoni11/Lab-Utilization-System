import React from "react";

const Footer = () => {
	return (
		<div>
			<footer className="mt-20 pt-8 px-10 bg-gray-300 border-gray-200">
				<div className="grid md:grid-cols-4 gap-8 ">
					<div>
						<h3 className="font-bold text-xl mb-4 text-black-800">
							Lab Management System
						</h3>
						<p className="text-gray-600">
							Simplifying laboratory management for educational institutions.
						</p>
					</div>
					<div className="mb-3">
						<h3 className="font-bold text-xl mb-4 text-black-800">
							Quick Links
						</h3>
						<ul className="space-y-2 text-gray-600">
							<li>
								<a href="#" className="hover:text-blue-600 transition-colors">
									Home
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-blue-600 transition-colors">
									About
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-blue-600 transition-colors">
									Contact
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-blue-600 transition-colors">
									Help
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="font-bold text-xl mb-4 text-black-800">Resources</h3>
						<ul className="space-y-2  text-gray-600">
							<li>
								<a href="#" className="hover:text-blue-600 transition-colors ">
									User Guide
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-blue-600 transition-colors">
									FAQ
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-blue-600 transition-colors">
									Lab Policies
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-blue-600 transition-colors">
									Equipment List
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="font-bold text-xl mb-4 text-black-800">Contact</h3>
						<ul className="space-y-2 text-gray-600">
							<li className="flex items-center">
								<span className="mr-2">📧</span> support@labsystem.edu
							</li>
							<li className="flex items-center">
								<span className="mr-2">📞</span> +1 (555) 123-4567
							</li>
							<li className="flex items-center">
								<span className="mr-2">📍</span> University Campus, Building B
							</li>
						</ul>
					</div>
				</div>
				<div className="text-center py-6 border-t border-gray-200 text-gray-600">
					<p>
						© {new Date().getFullYear()} Lab Management System. All rights
						reserved.
					</p>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
