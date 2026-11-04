import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PublicBuildCard } from "./public-build-card";

export async function PublicBuilds() {
  const session = await auth();
  if (!session) redirect("/login");

  const userId = session.user.id;

  const builds = await prisma.build.findMany({
    where: { isPublic: true },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { email: true, name: true } },
      components: {
        include: {
          component: { select: { name: true, type: true, price: true } },
        },
      },
      likes: { where: { userId }, select: { id: true } },
      _count: { select: { likes: true } },
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
      {builds.map((b) => {
        return <PublicBuildCard key={b.id} build={b} />;
      })}
    </div>
  );
}
