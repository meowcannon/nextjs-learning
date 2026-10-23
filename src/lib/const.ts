import type { Category } from "./types";
import {
  Box,
  Cpu,
  Fan,
  HardDrive,
  MemoryStick,
  Monitor,
  Server,
  Zap,
} from "lucide-react";

export const categories: Category[] = [
  { id: "cpu", name: "CPU", icon: "Cpu" },
  { id: "gpu", name: "Graphics", icon: "Monitor" },
  { id: "motherboard", name: "Motherboard", icon: "Server" },
  { id: "ram", name: "Memory", icon: "MemoryStick" },
  { id: "storage", name: "Storage", icon: "HardDrive" },
  { id: "psu", name: "Power", icon: "Zap" },
  { id: "case", name: "Case", icon: "Box" },
  { id: "cooling", name: "Cooling", icon: "Fan" },
];

export const iconMap: Record<Category["icon"], React.ElementType> = {
  Cpu,
  Monitor,
  Server,
  MemoryStick,
  HardDrive,
  Zap,
  Box,
  Fan,
};
