"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect } from "react";

interface CounsellorImagePreviewProps {
  image: string;
  name: string;
  onClose: () => void;
}

export default function CounsellorImagePreview({
  image,
  name,
  onClose,
}: CounsellorImagePreviewProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/80
        p-3
        backdrop-blur-sm
        sm:p-6
      "
      role="dialog"
      aria-modal="true"
      aria-label={`${name} profile`}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close profile image"
        className="
          absolute
          right-4
          top-4
          z-10
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          bg-white
          text-secondary
          shadow-lg
          transition
          hover:bg-primary-light
          hover:text-primary
          sm:right-6
          sm:top-6
        "
      >
        <X className="h-5 w-5" />
      </button>

      {/* Image */}
      <div
        className="
          relative
          max-h-[95vh]
          max-w-[95vw]
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
          sm:rounded-3xl
        "
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={image}
          alt={name}
          width={1600}
          height={900}
          priority
          className="
            max-h-[92vh]
            w-auto
            max-w-full
            object-contain
          "
        />
      </div>
    </div>
  );
}