import { CurrentBuild } from "./components/current-build";

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-6 lg:flex-row lg:items-start">
      <div className="min-w-0 flex-1">
        <CurrentBuild />
      </div>
      <aside className="shrink-0 lg:sticky lg:top-6 lg:w-40">Popular</aside>
    </main>
  );
}
