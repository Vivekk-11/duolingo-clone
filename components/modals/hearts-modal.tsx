"use client";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import useHeartsModal from "@/hooks/use-hearts-modal";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HeartsModal = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { isOpen, close } = useHeartsModal();

  const onClick = () => {
    close();
    router.push("/store");
  };

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-5 w-full">
            <Image src="/mascot_bad.svg" alt="Mascot" height={80} width={80} />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            You ran out of hearts!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Get Pro for unlimited hearts, or purchase them in the store.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={onClick}
            >
              Get unlimited hearts
            </Button>
            <Button
              variant="primaryOutline"
              size="lg"
              className="w-full"
              onClick={close}
            >
              No thanks
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HeartsModal;
