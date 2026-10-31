"use server";

import prisma from "@/lib/prisma";
import { categoryToDatabaseType, Component } from "@/lib/types";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export type SaveBuildState = {
  status: "success" | "error" | null;
  message?: string;
};

export async function saveBuildAction(
  _prevState: SaveBuildState,
  formData: FormData,
): Promise<SaveBuildState> {
  const session = await auth();
  if (!session) {
    return {
      status: "error",
      message: "Authentication required",
    };
  }

  const name = String(formData.get("name") ?? "").trim();

  const componentIds = String(formData.get("componentIds"))
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  const components = await prisma.component.findMany({
    where: { id: { in: componentIds } },
    select: { id: true, price: true },
  });

  if (components.length !== componentIds.length) {
    return {
      status: "error",
      message: "Some components not found",
    };
  }

  const price = components.reduce((sum, c) => sum + c.price, 0);

  try {
    const build = await prisma.build.create({
      data: {
        name,
        price,
        userId: session.user.id,
        components: {
          create: componentIds.map((c) => ({ componentId: c })),
        },
      },
    });
    revalidatePath("/dashboard");
    revalidatePath("/builds");
    return {
      status: "success",
    };
  } catch (error) {
    console.error("saveBuildAction failed", error);
    return {
      status: "error",
      message: "Failed to save",
    };
  }
}

export async function getComponents(categoryId: string): Promise<Component[]> {
  const type = categoryToDatabaseType[categoryId];
  if (!type) return [];

  return await prisma.component.findMany({
    where: { type },
    orderBy: { price: "asc" },
    select: { id: true, name: true, type: true, price: true, socket: true },
  });
}
