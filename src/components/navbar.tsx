"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutList, Plus, Users } from "lucide-react";
import { signOut } from "next-auth/react";
import { getTabValue } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";

export function Navbar({ authenticated = false }) {
  const pathname = usePathname();

  return (
    <nav className="container mx-auto grid grid-cols-3 items-center p-4">
      <div>
        <Link href={authenticated ? "/dashboard" : "/"}>PC Builder</Link>
      </div>

      <div className="flex justify-center">
        {authenticated && (
          <Tabs value={getTabValue(pathname)} className="w-fit">
            <TabsList>
              <TabsTrigger value="explore" asChild>
                <Link href="/explore">
                  <Users className="h-4 w-4" />
                  Public builds
                </Link>
              </TabsTrigger>

              <TabsTrigger value="builds" asChild>
                <Link href="/builds">
                  <LayoutList className="h-4 w-4" />
                  My builds
                </Link>
              </TabsTrigger>

              <TabsTrigger value="dashboard" asChild>
                <Link href="/dashboard" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  Create build
                </Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}
      </div>

      <div className="flex justify-end">
        {authenticated ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ redirectTo: "/" })}
          >
            Sign out
          </Button>
        ) : (
          <div>
            <Button variant="ghost" asChild>
              <Link href="/signup">Sign up</Link>
            </Button>

            <Button variant="secondary" asChild>
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
