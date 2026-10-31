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
import { Pencil } from "lucide-react";
import Link from "next/link";

type BuildCard = {
  user: {
    email: string;
  };
  id: string;
  name: string;
  price: number;
  createdAt: Date;
  components: Array<{
    id: string;
    component: {
      name: string;
    };
  }>;
};

export function BuildCard({
  build,
  children,
}: {
  build: BuildCard;
  children?: React.ReactNode;
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2 flex items-start justify-between gap-2">
        <CardTitle>
          <h3>{build.name}</h3>
          <p className="text-xs text-muted-foreground ">
            {formatDate(build.createdAt)}
          </p>
        </CardTitle>
        <div className="shrink-0">
          <Button asChild>
            <Link href={`/builds/${build.id}`}>
              <Pencil className="w-4 h-4" />
            </Link>
          </Button>
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
          <div className="flex flex-col gap-2">{children}</div>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
