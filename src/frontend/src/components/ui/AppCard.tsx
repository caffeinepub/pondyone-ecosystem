import { cn } from "@/lib/utils";
import type { MouseEvent, ReactNode } from "react";

interface AppCardProps {
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  padded?: boolean;
}

export function AppCard({
  children,
  className,
  onClick,
  padded = true,
}: AppCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl shadow-card border border-border",
        padded && "p-4",
        onClick &&
          "cursor-pointer transition-smooth hover:shadow-elevated active:scale-[0.98]",
        className,
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ")
                onClick(e as unknown as MouseEvent<HTMLDivElement>);
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
