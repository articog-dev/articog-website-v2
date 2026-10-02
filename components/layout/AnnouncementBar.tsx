"use client";

import { Link } from "@/components/ui/Link";

export function AnnouncementBar() {
  return (
    <div className="announcement-bar fixed inset-x-0 top-0 z-[1100] min-h-9 border-b border-white/10 bg-[#111] px-10 py-2 text-center text-[10px] font-medium leading-4 text-white/80 sm:px-10 sm:text-xs">
      <span>Articog is open for pilot collaborations. </span>
      <Link href="/book-a-demo" className="text-white underline underline-offset-4 transition hover:text-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
        Book a Demo →
      </Link>
      <button
        type="button"
        aria-label="Close announcement"
        onClick={() => {
          document.documentElement.setAttribute("data-announcement", "closed");
          try {
            localStorage.setItem("articog-announcement-closed", "1");
          } catch {
            // Storage may be unavailable; the current page can still dismiss the bar.
          }
        }}
        className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-4"
      >
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden="true">
          <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}