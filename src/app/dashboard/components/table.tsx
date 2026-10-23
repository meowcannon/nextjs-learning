"use client";

import type { Component } from "@/lib/types";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { categories, iconMap } from "@/lib/const";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function TableParts({
  selected,
  onSelected,
}: {
  selected: Record<string, Component | null>;
  onSelected: (category: string, component: Component | null) => void;
}) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const totalPrice = Object.values(selected).reduce(
    (sum, c) => sum + (c?.price ?? 0),
    0,
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">Component</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => {
          const Icon = iconMap[category.icon];
          const selectedCategory = selected[category.id];
          return (
            <TableRow key={category.id} className="my-2">
              <TableCell>
                <div className="flex items-center">
                  <Icon className="h-5 w-5 mr-1" />
                </div>
              </TableCell>
              <TableCell className="font-bold">{category.name}</TableCell>
              <TableCell>{selectedCategory?.name ?? "-"}</TableCell>
              <TableCell>{selectedCategory?.price ?? "-"}</TableCell>
              <TableCell className="text-right">
                <Dialog
                  open={openCategory === category.id}
                  onOpenChange={(open) =>
                    setOpenCategory(open ? category.id : null)
                  }
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      {selectedCategory ? "Edit" : "Add"}
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
