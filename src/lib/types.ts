import * as prisma from "@/prisma_generated/browser";

export type Component = prisma.Component;

export type ComponentType = prisma.$Enums.ComponentType;

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export const categoryToDatabaseType: Record<string, ComponentType> = {
  cpu: "cpu",
  gpu: "gpu",
  ram: "ram",
  storage: "ssd",
  motherboard: "motherboard",
  psu: "psu",
  case: "case",
  cooling: "cooler",
};

export const databaseTypeToCategory: Record<ComponentType, string> = {
  cpu: "cpu",
  gpu: "gpu",
  ram: "ram",
  ssd: "storage",
  motherboard: "motherboard",
  psu: "psu",
  case: "case",
  cooler: "cooling",
};
