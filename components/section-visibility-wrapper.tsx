"use client";

import React from "react";
import { useSectionVisibility } from "@/hooks/use-section-visibility";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface SectionVisibilityWrapperProps {
	sectionId: string;
	children: React.ReactNode;
}

export default function SectionVisibilityWrapper({
	sectionId,
	children,
}: SectionVisibilityWrapperProps) {
	const { isLoading, isSectionVisible, updateSectionVisibility, isAdmin } =
		useSectionVisibility();

	// During initial load, show a placeholder or nothing
	if (isLoading) {
		return null;
	}

	const isVisible = isSectionVisible(sectionId);

	// If the section should be hidden and user is not admin, return null
	if (!isVisible && !isAdmin) {
		return null;
	}

	return (
		<div className="relative">
			{isAdmin && (
				<div className="absolute top-2 right-2 z-50 flex items-center gap-2 bg-background/80 backdrop-blur-sm p-2 rounded-lg shadow">
					<Switch
						checked={isVisible}
						onCheckedChange={(checked) =>
							updateSectionVisibility(sectionId, checked)
						}
						id={`visibility-${sectionId}`}
					/>
					<Label htmlFor={`visibility-${sectionId}`}>
						{isVisible ? "Visible" : "Hidden"}
					</Label>
				</div>
			)}
			<div className={!isVisible && isAdmin ? "opacity-50" : ""}>
				{children}
			</div>
		</div>
	);
}
