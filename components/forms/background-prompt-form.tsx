"use client";

import {
  PromptInput,
  PromptInputButton,
  PromptInputTextarea,
  PromptInputToolbar,
} from "@/components/shared/ai-prompt-input";
import { Button } from "@/components/ui/button";
import sparkle from "@/icons/sparkle.svg";
import { Redo2Icon, Undo2Icon } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";

type BackgroundPromptFormData = {
  prompt: string;
};

type BackgroundPromptFormProps = {
  onSubmit: (data: BackgroundPromptFormData) => void;
  defaultPrompt?: string;
};

export function BackgroundPromptForm({
  onSubmit,
  defaultPrompt = "",
}: BackgroundPromptFormProps) {
  const { register, handleSubmit, watch } = useForm<BackgroundPromptFormData>({
    defaultValues: {
      prompt: defaultPrompt,
    },
  });

  const currentPrompt = watch("prompt");

  const handleRegenerate = () => {
    if (currentPrompt) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm text-black font-semibold">Background idea</h3>
      <PromptInput onSubmit={handleSubmit(onSubmit)}>
        <PromptInputTextarea
          {...register("prompt", { required: true })}
          placeholder="Type your message..."
          autoFocus
        />
        <PromptInputToolbar>
          <Button
            type="button"
            variant="ghost"
            className="cursor-pointer"
            onClick={handleRegenerate}
            disabled={!currentPrompt}
          >
            <Image src={sparkle} alt="Sparkle" width={20} height={20} />
            Regenerate
          </Button>
          <div className="flex items-center gap-2">
            <PromptInputButton type="button">
              <Undo2Icon className="size-5" />
            </PromptInputButton>
            <PromptInputButton type="button">
              <Redo2Icon className="size-5" />
            </PromptInputButton>
          </div>
        </PromptInputToolbar>
      </PromptInput>

      <Button
        type="submit"
        variant="default"
        className="w-full rounded-full cursor-pointer"
        disabled={!currentPrompt}
      >
        <Image src={sparkle} alt="Sparkle" width={20} height={20} />
        Generate BG for 1 credit
      </Button>
    </div>
  );
}
