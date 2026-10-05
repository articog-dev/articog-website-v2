"use client";

import { startTransition, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Button } from "@/components/ui";
import { CAL_TEAMS } from "@/lib/cal";
import { CalEmbed } from "./CalEmbed";

interface BookingTabsProps {
  prefill?: { name?: string; email?: string; notes?: string };
}

export function BookingTabs({ prefill }: BookingTabsProps) {
  const [activeTeamId, setActiveTeamId] = useState<(typeof CAL_TEAMS)[number]["id"]>(CAL_TEAMS[0].id);
  const hasSelectedTeam = useRef(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeTeamIndex = CAL_TEAMS.findIndex((team) => team.id === activeTeamId);
  const activeTeam = CAL_TEAMS[activeTeamIndex];

  useEffect(() => {
    if (hasSelectedTeam.current) return;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone.startsWith("America/")) {
      startTransition(() => setActiveTeamId("americas"));
    }
  }, []);

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % CAL_TEAMS.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + CAL_TEAMS.length) % CAL_TEAMS.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = CAL_TEAMS.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    hasSelectedTeam.current = true;
    setActiveTeamId(CAL_TEAMS[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Choose a booking team" className="mb-6 flex flex-wrap justify-center gap-3">
        {CAL_TEAMS.map((team, index) => {
          const isActive = team.id === activeTeamId;
          return (
            <Button
              key={team.id}
              ref={(element) => { tabRefs.current[index] = element; }}
              type="button"
              role="tab"
              id={`booking-tab-${team.id}`}
              aria-selected={isActive}
              aria-controls="cal-booking-panel"
              tabIndex={isActive ? 0 : -1}
              variant={isActive ? "secondary" : "outline"}
              size="sm"
              className={`h-10 px-4 py-2 text-xs leading-none uppercase tracking-wide md:h-11 md:text-sm ${isActive ? "border-white bg-white text-black hover:bg-white/85" : "border-white/20 bg-transparent text-white hover:bg-white/[0.06]"}`}
              onClick={() => {
                hasSelectedTeam.current = true;
                setActiveTeamId(team.id);
              }}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              {team.label}
            </Button>
          );
        })}
      </div>
      <div
        id="cal-booking-panel"
        role="tabpanel"
        aria-labelledby={`booking-tab-${activeTeam.id}`}
        tabIndex={0}
      >
        <CalEmbed key={activeTeam.calLink} calLink={activeTeam.calLink} prefill={prefill} />
      </div>
    </div>
  );
}