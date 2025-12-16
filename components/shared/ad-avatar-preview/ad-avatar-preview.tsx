import type { ComponentProps } from "react";

import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import Image, { type StaticImageData } from "next/image";

import person from "@/images/1d6d060467d681aefa58a581d0e83fca4de0d3eb.png";

const adAvatarPreviewVariants = cva(
  "relative rounded-xl overflow-hidden border-2 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 w-full h-full",
  {
    variants: {
      selected: {
        true: "border-primary",
        false: "border-transparent",
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);

type AdAvatarPreviewProps = ComponentProps<"button"> &
  VariantProps<typeof adAvatarPreviewVariants> & {
    src: string | StaticImageData;
    selected?: boolean;
    isDefault?: boolean;
  };

export function AdAvatarPreview({
  src,
  selected = false,
  isDefault = false,
  className,
  ...props
}: AdAvatarPreviewProps) {
  const backgroundDescription = isDefault
    ? "Default background"
    : "Background option";
  const selectionStatus = selected ? "selected" : "not selected";
  const ariaLabel = `${backgroundDescription}, ${selectionStatus}`;

  return (
    <button
      {...props}
      type="button"
      aria-pressed={selected}
      aria-label={ariaLabel}
      data-slot="ad-avatar-preview"
      data-selected={selected}
      className={cn(adAvatarPreviewVariants({ selected }), className)}
    >
      {isDefault && (
        <Badge
          variant="outline"
          aria-hidden="true"
          className="absolute top-2 left-2 rounded-[5px] text-[#404040] font-bold text-[10px] bg-white uppercase h-5 z-10"
        >
          Default
        </Badge>
      )}

      <Image
        src={src}
        alt=""
        aria-hidden="true"
        sizes="224px"
        quality={100}
        className="object-cover w-full h-full pointer-events-none"
      />
      <Image
        src={person}
        fill
        alt=""
        aria-hidden="true"
        className="w-full h-full object-contain object-bottom pointer-events-none"
        sizes="224px"
        quality={100}
      />
    </button>
  );
}
