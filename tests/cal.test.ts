import { describe, expect, it } from "vitest";
import { CAL_TEAMS, calPublicUrl } from "../lib/cal";

describe("Cal.com booking configuration", () => {
  it("keeps the regional booking links and public URL correct", () => {
    expect(CAL_TEAMS.map(({ id, label }) => [id, label])).toEqual([
      ["india-me", "India / Middle East Team"],
      ["international", "International Team"],
    ]);
    expect(CAL_TEAMS.map(({ calLink }) => calLink)).toEqual([
      "articog/demo-india",
      "articog/demo-americas",
    ]);
    expect(calPublicUrl(CAL_TEAMS[0].calLink)).toBe("https://cal.com/articog/demo-india");
    expect(calPublicUrl(CAL_TEAMS[1].calLink)).toBe("https://cal.com/articog/demo-americas");
  });
});