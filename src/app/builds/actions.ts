"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function setBuildPublicAction(formData: FormData) {
  const session = await auth();
  if (!session) return;

  const buildId = String(formData.get("buildId")) ?? "";
  if (!buildId) return;

  const isPublic = formData.get("isPublic") === "true";

  await prisma.build.update({
    where: {
      id: buildId,
      userId: session.user.id,
    },
    data: { isPublic },
  });

  revalidatePath("/builds");
  revalidatePath("/explore");
}

export async function deleteBuildAction(formData: FormData) {
  const session = await auth();
  if (!session) return;

  const buildId = String(formData.get("buildId")) ?? "";
  if (!buildId) return;

  await prisma.build.deleteMany({
    where: {
      id: buildId,
      userId: session.user.id,
    },
  });

  revalidatePath("/builds");
  revalidatePath("/explore");
}
