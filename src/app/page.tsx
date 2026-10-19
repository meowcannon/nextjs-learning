import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome</h1>
      <div className="flex gap-4">
        <Link href="/login">Log in</Link>
        {"/"}
        <Link href="/signup">Create Account</Link>
      </div>
    </main>
  );
}
