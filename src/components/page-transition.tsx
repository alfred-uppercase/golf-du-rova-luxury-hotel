import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function PageTransition() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const routerState = useRouterState();

  const isPending = routerState.isLoading || routerState.status === "pending";

  useEffect(() => {
    if (isPending) {
      setIsLoading(true);
      setProgress(0);
      // Simulate a fast progress fill
      const timer = setTimeout(() => setProgress(70), 50);
      return () => clearTimeout(timer);
    } else if (isLoading) {
      // Complete the progress then hide
      setProgress(100);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPending]);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500"
      style={{
        opacity: isPending ? 1 : 0,
        pointerEvents: isPending ? "all" : "none",
      }}
    >
      {/* Progress bar at top */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-border">
        <div
          className="h-full bg-accent transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Center branding */}
      <div className="text-center">
        <div
          className="font-display text-3xl md:text-4xl text-primary italic tracking-tight mb-4"
          style={{
            animation: "loader-pulse 1.5s ease-in-out infinite",
          }}
        >
          Golf du Rova
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted-foreground">
          Chargement
        </span>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <div className="w-8 h-[1px] bg-border" />
        <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground/50">
          Madagascar · Est. 1930
        </span>
        <div className="w-8 h-[1px] bg-border" />
      </div>
    </div>
  );
}
