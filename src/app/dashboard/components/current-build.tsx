"use client";

import { Button } from "@/components/ui/button";
import type { Component } from "@/lib/types";
import { useCallback, useState } from "react";
import { TableParts } from "./table";
import { SaveBuildDialog } from "./save-build-dialog";

export function CurrentBuild() {
  const [selected, setSelected] = useState<Record<string, Component | null>>({});
  const [dialogOpen, setDialogOpen] = useState(false);

  const onSelected = useCallback(
    (category: string, component: Component | null) => {
      setSelected((prev) => ({ ...prev, [category]: component }));
    },
    [],
  );

  return (
    <>
      <div className="flex justify-between mb-8">
        <h1>Create your build</h1>
        <Button onClick={() => setDialogOpen(true)}>Create</Button>
      </div>
      <div className="min-w-0 overflow-x-auto">
        <TableParts selected={selected} onSelected={onSelected} />
        <SaveBuildDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          selected={selected}
        />
      </div>
    </>
  );
}
