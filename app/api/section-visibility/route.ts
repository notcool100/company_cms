import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/section-visibility
export async function GET() {
	try {
		const sections = await prisma.sectionVisibility.findMany({
			orderBy: { name: "asc" },
		});
		return NextResponse.json({ success: true, data: sections });
	} catch (error) {
		console.error("Error fetching section visibility:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to fetch section visibility" },
			{ status: 500 },
		);
	}
}

// POST /api/section-visibility
export async function POST(req: Request) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.role || session.user.role.toUpperCase() !== "ADMIN") {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const body = await req.json();
		const { sectionId, name, isVisible, description } = body;

		const section = await prisma.sectionVisibility.upsert({
			where: { sectionId },
			update: { isVisible, description },
			create: {
				sectionId,
				name,
				isVisible,
				description,
			},
		});

		return NextResponse.json({ success: true, data: section });
	} catch (error) {
		console.error("Error updating section visibility:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to update section visibility" },
			{ status: 500 },
		);
	}
}

// DELETE /api/section-visibility
export async function DELETE(req: Request) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.role || session.user.role.toUpperCase() !== "ADMIN") {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const { searchParams } = new URL(req.url);
		const sectionId = searchParams.get("sectionId");

		if (!sectionId) {
			return NextResponse.json(
				{ success: false, error: "Section ID is required" },
				{ status: 400 },
			);
		}

		await prisma.sectionVisibility.delete({
			where: { sectionId },
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error deleting section visibility:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to delete section visibility" },
			{ status: 500 },
		);
	}
}
