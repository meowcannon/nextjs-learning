import { Suspense } from "react";
import { PublicBuilds } from "./components/public-builds";

export default function Page() {
  return (
    <>
      <h1 className="mb-5">Public Builds</h1>
      <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
        <PublicBuilds />
      </Suspense>
    </>
  );
}
