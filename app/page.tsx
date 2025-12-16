"use client";

import { showOverlay } from "@/components/shared/global-overlay-manager/utils";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Button size="lg" onClick={() => showOverlay("avatar-background-drawer")}>
        Open Drawer
      </Button>
    </div>
  );
}
