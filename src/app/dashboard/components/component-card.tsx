import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { Plus } from "lucide-react";

export function ComponentCard({
  name,
  price,
  onClick,
}: {
  name: string;
  price: number;
  onClick?: () => void;
}) {
  return (
    <Card className="min-w-42.25 px-5 flex flex-col justify-between">
      <CardTitle className="text-base font-medium leading-tight">
        {name}
      </CardTitle>
      <div className="flex items-center justify-between">
        <CardDescription className="text-sm font-medium tabular-nums">
          {formatPrice(price)}
        </CardDescription>
        <Button variant="secondary" size="sm" className="" onClick={onClick}>
          <Plus className="h-3.5 w-3.5" />
          Add
        </Button>
      </div>
    </Card>
  );
}
