"use server";

import prisma from "@/lib/prisma";
import { categoryToDatabaseType, Component } from "@/lib/types";

export async function getComponents(categoryId: string): Promise<Component[]> {
  const dbType = categoryToDatabaseType[categoryId];

  if (!dbType) return [];

  const components = await prisma.component.findMany({
    where: { type: dbType },
    orderBy: { price: "asc" },
  });

  return components.map((c) => ({
    name: c.name,
    id: c.id,
    type: c.type,
    price: c.price,
    socket: c.socket,
  }));
}
