"use client";

import { useSyncExternalStore } from "react";

export type OverlayNames = "avatar-background-drawer";

export type OverlayProps = Record<string, any>;

let overlaysRegistry = new Map<
  OverlayNames,
  { open: boolean; props?: OverlayProps }
>();

const eventTarget = new EventTarget();
const emitUpdate = () => eventTarget.dispatchEvent(new Event("update"));

export function showOverlay(name: OverlayNames, props?: OverlayProps) {
  overlaysRegistry = new Map(overlaysRegistry);
  overlaysRegistry.set(name, { open: true, props });
  emitUpdate();
}

export function hideOverlay(name: OverlayNames) {
  overlaysRegistry = new Map(overlaysRegistry);
  overlaysRegistry.delete(name);
  emitUpdate();
}

function subscribe(callback: () => void) {
  const handler = () => callback();
  eventTarget.addEventListener("update", handler);
  return () => eventTarget.removeEventListener("update", handler);
}

export const useOverlays = () => {
  return useSyncExternalStore(
    subscribe,
    () => overlaysRegistry,
    () => undefined
  );
};

export function useOverlayState<T extends OverlayProps>(name: OverlayNames) {
  const allOverlays = useOverlays();
  const overlay = allOverlays?.get(name);

  return {
    open: overlay?.open ?? false,
    props: (overlay?.props ?? {}) as T,
    showDialog: (props?: T) => showOverlay(name, props),
    hideDialog: () => hideOverlay(name),
  };
}
