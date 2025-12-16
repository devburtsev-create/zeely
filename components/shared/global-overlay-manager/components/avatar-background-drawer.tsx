"use client";

import { XIcon } from "lucide-react";
import { memo, useState, type FC } from "react";

import { BackgroundPromptForm } from "@/components/forms/background-prompt-form";
import { AdAvatarPreview } from "@/components/shared/ad-avatar-preview";
import { CircularProgress } from "@/components/shared/circular-progress";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import bg1 from "@/images/3f140ac961ef5fa535627db3e606b789ad49f7d9.png";
import bg2 from "@/images/4c7348d3d57edbf6bf6a737771d503bd47faf891.png";
import bg3 from "@/images/829adaf117e53ddd157a6a171a11a907fb8415c7.png";
import bg4 from "@/images/f9c2a16fd526eaa8e634a7ae2ea2525d561d9bf4.png";

import { useOverlayState } from "../utils";

const backgrounds = [bg1, bg2, bg3, bg4] as unknown as string[];

type AdBackgroundsListProps = {
  backgrounds: string[];
  selected?: string;
  onSelect?: (id: string) => void;
};

const AdBackgroundsList: FC<AdBackgroundsListProps> = memo(
  ({ backgrounds, selected, onSelect }) => {
    return (
      <div
        className="grid grid-cols-3 auto-rows-fr gap-3"
        role="group"
        aria-label="Background options"
      >
        <div className="bg-primary relative rounded-xl">
          <CircularProgress
            value={25}
            size={65}
            strokeWidth={3}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          />
        </div>

        {backgrounds.map((bg, index) => (
          <AdAvatarPreview
            key={`bg-${index}`}
            src={bg}
            className="cursor-pointer"
            selected={bg === selected}
            isDefault={index === 0}
            onClick={() => onSelect?.(bg)}
          />
        ))}
      </div>
    );
  }
);

AdBackgroundsList.displayName = "AdBackgroundsList";

type AvatarBackgroundDrawerProps = Record<string, never>;

const AvatarBackgroundDrawer = memo(() => {
  const { hideDialog } = useOverlayState<AvatarBackgroundDrawerProps>(
    "avatar-background-drawer"
  );

  const [selectedBg, setSelectedBg] = useState<string>(backgrounds[0]);

  return (
    <Sheet open onOpenChange={hideDialog}>
      <SheetContent className="w-[400px] sm:max-w-none">
        <SheetHeader className="flex-row justify-between items-center">
          <SheetTitle>Change background</SheetTitle>
          <SheetClose>
            <XIcon className="size-6" />
          </SheetClose>
        </SheetHeader>

        <div className="grid grid-rows-[auto_1fr] gap-6 px-5 overflow-y-auto pb-5 h-[calc(100vh-80px)]">
          <BackgroundPromptForm
            onSubmit={(data) => alert(data.prompt)}
            defaultPrompt="Animate glowing rays pulsating from behind the bottle, leaves gently swaying, and golden sparkles floating upward for a natural, radiant effect."
          />

          <div className="flex flex-col gap-3">
            <h3 className="text-sm text-black font-semibold">
              Your backgrounds
            </h3>
            <AdBackgroundsList
              backgrounds={backgrounds}
              selected={selectedBg}
              onSelect={setSelectedBg}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
});

AvatarBackgroundDrawer.displayName = "AvatarBackgroundDrawer";

export default AvatarBackgroundDrawer;
