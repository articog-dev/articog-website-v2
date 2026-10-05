"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useRef, useState } from "react";
import { trackBookingScheduled } from "@/lib/analytics";

interface CalEmbedProps {
  calLink: string;
  prefill?: { name?: string; email?: string; notes?: string };
}

export function CalEmbed({ calLink, prefill }: CalEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const hasTrackedBooking = useRef(false);

  useEffect(() => {
    let isMounted = true;
    let calApi: Awaited<ReturnType<typeof getCalApi>> | undefined;
    const finishLoading = () => {
      if (isMounted) setIsLoading(false);
    };
    const handleBookingSuccessful = () => {
      if (hasTrackedBooking.current) return;
      hasTrackedBooking.current = true;
      trackBookingScheduled();
    };
    const fallbackTimer = window.setTimeout(finishLoading, 15000);

    void getCalApi({ namespace: "demo" })
      .then((cal) => {
        if (!isMounted) return;
        calApi = cal;
        cal("ui", { theme: "dark", layout: "month_view", hideEventTypeDetails: false });
        cal("on", { action: "linkReady", callback: finishLoading });
        cal("on", { action: "linkFailed", callback: finishLoading });
        cal("on", { action: "bookingSuccessful", callback: handleBookingSuccessful });
      })
      .catch(finishLoading);

    return () => {
      isMounted = false;
      window.clearTimeout(fallbackTimer);
      calApi?.("off", { action: "linkReady", callback: finishLoading });
      calApi?.("off", { action: "linkFailed", callback: finishLoading });
      calApi?.("off", { action: "bookingSuccessful", callback: handleBookingSuccessful });
    };
  }, []);

  return (
    <div
      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-1 md:p-2"
      aria-busy={isLoading}
      data-cal-link={calLink}
    >
      <Cal
        namespace="demo"
        calLink={calLink}
        style={{ width: "100%" }}
        config={{
          layout: "month_view",
          theme: "dark",
          ...(prefill?.name ? { name: prefill.name } : {}),
          ...(prefill?.email ? { email: prefill.email } : {}),
          ...(prefill?.notes ? { notes: prefill.notes } : {}),
        }}
      />
      {isLoading ? (
        <div className="min-h-[700px] space-y-6 rounded-xl bg-black p-6" aria-hidden="true">
          <div className="h-8 w-2/5 animate-pulse rounded bg-white/10" />
          <div className="grid grid-cols-2 gap-6">
            <div className="h-10 animate-pulse rounded bg-white/10" />
            <div className="h-10 animate-pulse rounded bg-white/10" />
          </div>
          <div className="grid min-h-[560px] grid-cols-2 gap-6">
            <div className="animate-pulse rounded bg-white/[0.04]" />
            <div className="animate-pulse rounded bg-white/[0.04]" />
          </div>
        </div>
      ) : null}
    </div>
  );
}