// app/(your-segment)/dashboard/layout.tsx
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="px-5">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-5xl font-bold">Industry Insights</h1>
      </div>

      <Suspense
        fallback={
          <div className="mt-4 h-1 w-full overflow-hidden rounded bg-zinc-800">
            <div className="h-full w-1/3 animate-[loading_1.2s_infinite] bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-500" />
            {/* keyframes in globals.css:
              @keyframes loading {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(300%); }
              }
            */}
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
