import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { BuildCard } from "./build-card";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function Builds() {
  const session = await auth();
  if (!session) redirect("/login");

  const builds = await prisma.build.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { email: true } },
      components: {
        include: {
          component: { select: { name: true, type: true, price: true } },
        },
      },
    },
  });

  if (builds.length === 0) {
    return (
      <>
        <p className="text-muted-foreground mb-5">The list is empty</p>
        <Button asChild>
          <Link href={"/dashboard"}>Create build</Link>
        </Button>
      </>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {builds.map((b) => (
        <BuildCard key={b.id} build={b} />
      ))}
    </div>
  );
}
