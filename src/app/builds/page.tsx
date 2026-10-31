import { Suspense } from "react";
import { Builds } from "./components/builds";

export default function Page() {
  return (
    <main>
      <h1 className="mb-5">My Builds</h1>
      <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
        <Builds />
      </Suspense>
    </main>
  );
}
