"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Component } from "@/lib/types";
import { useEffect, useState } from "react";
import { ComponentCard } from "./component-card";
import { getComponents } from "../actions";

export function AddComponentDialog({
  categoryId,
  categoryName,
  onSelect,
}: {
  categoryId: string;
  categoryName: string;
  onSelect: (component: Component) => void;
}) {
  const [components, setComponents] = useState<Component[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getComponents(categoryId).then((data) => {
      setComponents(data);
      setLoading(false);
    });
  }, [categoryId]);

  return (
    <DialogContent className="sm:max-w-4xl w-[90vw] max-h-[85vh] flex flex-col">
      <DialogHeader>
        <DialogTitle>Add component - {categoryName}</DialogTitle>
      </DialogHeader>
      <div className="overflow-y-auto flex-1 p-5">
        {components.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((c) => (
              <ComponentCard
                key={c.id}
                name={c.name}
                price={c.price}
                onClick={() => onSelect(c)}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm py-4">
            {loading ? "Loading..." : "No components available"}
          </p>
        )}
      </div>
    </DialogContent>
  );
}
