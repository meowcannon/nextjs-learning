"use client";

import { Component } from "@/lib/types";
import { saveBuildAction, SaveBuildState } from "../actions";
import { useRouter } from "next/navigation";
import { useActionState, useMemo, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SaveBuildDialog({
  open,
  onOpenChange,
  selected,
  defaultName,
  redirectPath,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected: Record<string, Component | null>;
  defaultName?: string;
  redirectPath?: string;
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const componentIds = useMemo(
    () =>
      Object.values(selected)
        .filter((component): component is Component => component !== null)
        .map((component) => component.id)
        .join(","),
    [selected],
  );

  const handleAction = async (prev: SaveBuildState, formData: FormData) => {
    const result = await saveBuildAction(prev, formData);

    if (result.status !== "success") {
      toast.error("Failed to save the build");
      return result;
    }

    toast.success("Build saved");
    formRef.current?.reset();
    onOpenChange(false);
    if (redirectPath) router.push(redirectPath);
    else router.refresh();

    return result;
  };

  const [_, formAction, isPending] = useActionState(handleAction, {
    status: null,
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) formRef.current?.reset();
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save build</DialogTitle>
          <DialogDescription>Enter the build name</DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={formAction} className="space-y-4">
          <Input
            name="name"
            placeholder="Gaming PC"
            defaultValue={defaultName}
            required
          />
          <input type="hidden" name="componentIds" value={componentIds} />

          <DialogFooter>
            <Button
              type="submit"
              disabled={isPending || componentIds.length === 0}
            >
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
