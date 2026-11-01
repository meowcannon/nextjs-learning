import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { setBuildPublicAction } from "../actions";

export function ShareButton({
  buildId,
  isPublic,
}: {
  buildId: string;
  isPublic: boolean;
}) {
  return (
    <form action={setBuildPublicAction}>
      <input type="hidden" name="buildId" value={buildId} />
      <input
        type="hidden"
        name="isPublic"
        value={isPublic ? "false" : "true"}
      />
      <Button type="submit" variant={isPublic ? "default" : "ghost"}>
        <Share2
          className={`w-4 h-4 mr-1 ${isPublic ? "fill-background" : ""}`}
        />
      </Button>
    </form>
  );
}
