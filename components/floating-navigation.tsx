"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Home, Layers, Users, Briefcase, Mail, Menu, X } from "lucide-react";

const navItems = [
	{ id: "home", label: "Home", icon: Home },
	{ id: "services", label: "Services", icon: Layers },
	{ id: "about", label: "About", icon: Users },
	{ id: "portfolio", label: "Portfolio", icon: Briefcase },
	{ id: "contact", label: "Contact", icon: Mail },
];

export default function FloatingNavigation() {
	const [activeSection, setActiveSection] = useState("home");
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 100);

			const sections = navItems.map((item) => {
				const element = document.getElementById(item.id);
				if (!element) return { id: item.id, position: 0 };

				const rect = element.getBoundingClientRect();
				return {
					id: item.id,
					position: Math.abs(rect.top),
				};
			});

			const closest = sections.reduce((prev, curr) =>
				prev.position < curr.position ? prev : curr
			);

			setActiveSection(closest.id);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<>
			{/* Mobile menu button */}
			<motion.button
				className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white shadow-lg md:hidden"
				onClick={() => setIsOpen(!isOpen)}
				whileTap={{ scale: 0.9 }}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 1 }}
			>
				{isOpen ? <X size={20} /> : <Menu size={20} />}
			</motion.button>

			{/* Mobile navigation */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center md:hidden"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.div
							className="bg-white/10 backdrop-blur-md rounded-xl p-6 w-[80%] max-w-sm"
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
						>
							<div className="flex flex-col space-y-4">
								{navItems.map((item) => (
									<Link
										key={item.id}
										href={`#${item.id}`}
										className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
											activeSection === item.id
												? "bg-white/20 text-white font-medium"
												: "text-white font-medium hover:text-white hover:bg-white/10"
										}`}
										onClick={() => setIsOpen(false)}
									>
										<item.icon size={20} className="text-white" />
										<span className="text-white font-medium">{item.label}</span>
									</Link>
								))}
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Desktop navigation */}
			<motion.div
				className="fixed top-0 left-0 right-0 z-50 hidden md:block"
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.3 }}
			>
				<div
					className={`px-6 py-2 backdrop-blur-md transition-all duration-300 ${
						isScrolled ? "bg-black/80 shadow-lg" : "bg-black/50"
					}`}
				>
					<div className="max-w-7xl mx-auto flex items-center justify-between">
						<Link href="#home" className="flex items-center">
							<Image
								src="/logo.png"
								alt="Company Logo"
								width={80}
								height={80}
								className="rounded-full"
							/>
						</Link>
						<div className="flex items-center space-x-1">
							{navItems.map((item) => (
								<Link
									key={item.id}
									href={`#${item.id}`}
									className="relative px-4 py-2 rounded-full transition-colors text-white"
								>
									{activeSection === item.id && (
										<motion.div
											className="absolute inset-0 bg-white/20 rounded-full"
											layoutId="activeSection"
											transition={{ type: "spring", duration: 0.6 }}
										/>
									)}
									<span className="relative z-10 text-white font-semibold text-lg">
										{item.label}
									</span>
								</Link>
							))}
						</div>
					</div>
				</div>
			</motion.div>
		</>
	);
}
