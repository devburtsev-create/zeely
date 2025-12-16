"use client";

import { lazy, memo, Suspense } from "react";

import { useOverlays } from "./utils";

const AvatarBackgroundDrawer = lazy(
  () => import("./components/avatar-background-drawer")
);

export const GlobalOverlayManager = memo(() => {
  const overlays = useOverlays();

  return (
    <Suspense fallback={null}>
      {overlays?.get("avatar-background-drawer") && <AvatarBackgroundDrawer />}
    </Suspense>
  );
});

GlobalOverlayManager.displayName = "GlobalOverlayManager";
