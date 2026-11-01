"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { deleteBuildAction } from "../actions";

export function DeleteButton({ buildId }: { buildId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (!confirm("Delete build?")) return;

    const formData = new FormData();
    formData.set("buildId", buildId);

    startTransition(() => deleteBuildAction(formData));
  };

  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      disabled={isPending}
      onClick={handleClick}
    >
      Delete
    </Button>
  );
}
