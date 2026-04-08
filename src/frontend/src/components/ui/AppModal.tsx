import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect } from "react";

interface AppModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  /** Prevents closing via overlay click or Escape — for alarm modals */
  persistent?: boolean;
}

export function AppModal({
  isOpen,
  onClose,
  title,
  children,
  className,
  persistent = false,
}: AppModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !persistent) onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, persistent]);

  if (!isOpen) return null;

  return (
    <dialog
      open={isOpen}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 w-full h-full max-w-none m-0 bg-transparent"
      aria-label={title}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={persistent ? undefined : onClose}
        onKeyDown={
          persistent
            ? undefined
            : (e) => {
                if (e.key === "Enter") onClose();
              }
        }
        role={persistent ? undefined : "button"}
        tabIndex={persistent ? undefined : -1}
        aria-label="Close"
      />
      {/* Panel */}
      <div
        className={cn(
          "relative z-10 bg-card rounded-2xl shadow-alarm w-full max-w-md max-h-[90vh] overflow-y-auto animate-slide-up",
          className,
        )}
      >
        {/* Header */}
        {(title || !persistent) && (
          <div className="flex items-center justify-between p-4 border-b border-border">
            {title && (
              <h2 className="text-base font-semibold text-foreground font-display">
                {title}
              </h2>
            )}
            {!persistent && (
              <button
                type="button"
                onClick={onClose}
                className="ml-auto p-1.5 rounded-lg hover:bg-muted transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        )}
        {/* Body */}
        <div className="p-4">{children}</div>
      </div>
    </dialog>
  );
}
