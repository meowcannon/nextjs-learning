import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl font-bold">Build the PC of your dreams</h1>
      <Button asChild>
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
    </main>
  );
}
