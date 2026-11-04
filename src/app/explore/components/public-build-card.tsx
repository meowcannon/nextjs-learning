import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate, formatPrice } from "@/lib/utils";
import { toggleLikeAction } from "../actions";
import { ThumbsUp } from "lucide-react";

type PublicBuildCard = {
  user: {
    name: string | null;
  };
  id: string;
  name: string;
  price: number;
  createdAt: Date;
  likes: Array<{
    id: string;
  }>;
  _count: {
    likes: number;
  };
  components: Array<{
    id: string;
    component: {
      name: string;
    };
  }>;
};

export function PublicBuildCard({ build }: { build: PublicBuildCard }) {
  const isLiked = build.likes.length > 0;

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2 flex items-start justify-between gap-2">
        <CardTitle>
          <h3>{build.name}</h3>
          <p className="text-xs text-muted-foreground">
            {formatDate(build.createdAt)} {build.user?.name}
          </p>
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          <form action={toggleLikeAction} className="contents">
            <input type="hidden" name="buildId" value={build.id} />
            <Button
              type="submit"
              variant={isLiked ? "outline" : "secondary"}
              size="sm"
            >
              <ThumbsUp
                className={`w-4 h-4 mr-1 ${isLiked ? "fill-current" : ""}`}
              />
              {build._count.likes}
            </Button>
          </form>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pt-0 space-y-1 gap-2">
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-0">
          {build.components.map((bc) => (
            <li key={bc.id}>{bc.component.name}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-between gap-2 pt-4 border-t">
        <CardDescription className="text-sm font-medium tabular-nums flex flex-col justify-between">
          <span className="text-sky-500 text-lg font-bold">
            {formatPrice(build.price)}
          </span>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
