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

		let settings: Setting[];
		if (category) {
			settings = await prisma.setting.findMany({
				where: { category },
			});
		} else {
			settings = await prisma.setting.findMany();
		}

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
					where: { key: setting.key },
					update: { value: setting.value },
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

		if (!key) {
			return NextResponse.json(
				{ success: false, error: "Key parameter is required" },
				{ status: 400 },
			);
		}

		// Check if setting exists
		const existingSetting = await db.getSetting(key);
		if (!existingSetting) {
			return NextResponse.json(
				{ success: false, error: "Setting not found" },
				{ status: 404 },
			);
		}

		// Delete the setting
		await db.deleteSetting(key);

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
