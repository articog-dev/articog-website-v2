export const CAL_BASE_URL = "https://cal.com";

export const CAL_TEAMS = [
  { id: "india-me", label: "India / Middle East Team", calLink: "articog/demo-india" },
  { id: "americas", label: "Americas Team", calLink: "articog/demo-americas" },
] as const;

export const calPublicUrl = (calLink: string) => `${CAL_BASE_URL}/${calLink}`;