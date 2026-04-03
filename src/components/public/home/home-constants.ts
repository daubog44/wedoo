import type { HomeFeatureTone } from "../../../data/mocks/public-home";

export const wedooSdgPalette = [
  "#19486A",
  "#00689D",
  "#56C02B",
  "#0A97D9",
  "#3F7E44",
  "#BF8B2E",
  "#FD9D24",
  "#DD1367",
  "#FD6925",
  "#A21942",
  "#FCC30B",
  "#26BDE2",
  "#FF3A21",
  "#C5192D",
  "#4C9F38",
  "#DDA63A",
  "#E5243B",
] as const;

export const homeFeatureToneStyles = {
  gold: {
    borderClassName: "border-[var(--wedoo-gold)]",
    buttonVariant: "discoverGold",
  },
  rose: {
    borderClassName: "border-[var(--wedoo-rose-300)]",
    buttonVariant: "discoverRose",
  },
  violet: {
    borderClassName: "border-[var(--wedoo-violet-soft)]",
    buttonVariant: "discoverViolet",
  },
} as const satisfies Record<
  HomeFeatureTone,
  {
    borderClassName: string;
    buttonVariant: "discoverGold" | "discoverRose" | "discoverViolet";
  }
>;
