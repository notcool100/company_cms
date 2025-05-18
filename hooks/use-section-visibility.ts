"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export interface Section {
	id: number;
	sectionId: string;
	name: string;
	isVisible: boolean;
	description?: string;
}

export function useSectionVisibility() {
	const { data: session } = useSession();
	const [sections, setSections] = useState<Section[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchSections = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const res = await fetch("/api/section-visibility");
			if (!res.ok) {
				throw new Error("Failed to fetch section visibility");
			}

			const data = await res.json();
			if (data.success) {
				setSections(data.data);
			}
		} catch (err) {
			console.error("Error fetching section visibility:", err);
			setError("Failed to load section visibility settings");
		} finally {
			setIsLoading(false);
		}
	};

	const updateSectionVisibility = async (
		sectionId: string,
		isVisible: boolean,
	) => {
		if (!session?.user || session.user.role !== "ADMIN") {
			setError("Unauthorized");
			return;
		}

		try {
			const section = sections.find((s) => s.sectionId === sectionId);
			if (!section) return;

			const res = await fetch("/api/section-visibility", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					sectionId,
					name: section.name,
					isVisible,
					description: section.description,
				}),
			});

			if (!res.ok) {
				throw new Error("Failed to update section visibility");
			}

			const data = await res.json();
			if (data.success) {
				setSections((prev) =>
					prev.map((s) =>
						s.sectionId === sectionId ? { ...s, isVisible } : s,
					),
				);
			}
		} catch (err) {
			console.error("Error updating section visibility:", err);
			setError("Failed to update section visibility");
		}
	};

	useEffect(() => {
		fetchSections();
	}, []);

	const isSectionVisible = (sectionId: string) => {
		const section = sections.find((s) => s.sectionId === sectionId);
		return section?.isVisible ?? true; // Default to visible if section not found
	};

	return {
		sections,
		isLoading,
		error,
		isSectionVisible,
		updateSectionVisibility,
		isAdmin: session?.user?.role === "ADMIN",
	};
}
