import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import type { Setting } from "@prisma/client";

// Validation schema for creating/updating a setting
const settingSchema = z.object({
	key: z.string().min(1, { message: "Key is required" }),
	value: z.string().min(1, { message: "Value is required" }),
	category: z.string().default("general"),
});

type SettingInput = z.infer<typeof settingSchema>;
const bulkSettingsSchema = z.object({
	settings: z.array(settingSchema),
});

type BulkSettingsInput = z.infer<typeof bulkSettingsSchema>;

export async function GET(request: NextRequest) {
	try {
		const url = new URL(request.url);
		const category = url.searchParams.get("category");

		const settings = await prisma.setting.findMany({
			where: category ? { category } : undefined,
		});

		return NextResponse.json({
			success: true,
			data: settings,
		});
	} catch (error) {
		console.error("Error fetching settings:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to fetch settings" },
			{ status: 500 },
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		// Check authentication
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 },
			);
		}

		// Check authorization (only admin can manage settings)
		if (session.user.role !== "admin") {
			return NextResponse.json(
				{ success: false, error: "Forbidden" },
				{ status: 403 },
			);
		}

		// Parse and validate request body
		const data: unknown = await request.json();
		const result = bulkSettingsSchema.safeParse(data);

		if (!result.success) {
			return NextResponse.json(
				{
					success: false,
					error: "Validation failed",
					details: result.error.format(),
				},
				{ status: 400 },
			);
		}

		// Create or update the settings in a transaction
		const updatedSettings = await prisma.$transaction(
			result.data.settings.map((setting) =>
				prisma.setting.upsert({
					where: {
						key_category: {
							key: setting.key,
							category: setting.category,
						},
					},
					update: {
						value: setting.value,
					},
					create: {
						key: setting.key,
						value: setting.value,
						category: setting.category,
					},
				}),
			),
		);

		return NextResponse.json(
			{ success: true, data: updatedSettings },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error creating/updating settings:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to create/update settings" },
			{ status: 500 },
		);
	}
}

export async function DELETE(request: NextRequest) {
	try {
		// Check authentication
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 },
			);
		}

		// Check authorization (only admin can delete settings)
		if (session.user.role !== "admin") {
			return NextResponse.json(
				{ success: false, error: "Forbidden" },
				{ status: 403 },
			);
		}

		const url = new URL(request.url);
		const key = url.searchParams.get("key");
		const category = url.searchParams.get("category");

		if (!key || !category) {
			return NextResponse.json(
				{ success: false, error: "Key and category parameters are required" },
				{ status: 400 },
			);
		}

		// Delete the setting
		await prisma.setting.delete({
			where: {
				key_category: {
					key,
					category,
				},
			},
		});

		return NextResponse.json({
			success: true,
			message: "Setting deleted successfully",
		});
	} catch (error) {
		console.error("Error deleting setting:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to delete setting" },
			{ status: 500 },
		);
	}
}
