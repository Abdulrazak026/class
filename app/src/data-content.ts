import { Module } from "./data";
import { phase0 } from "./phases/phase0";
import { phase1 } from "./phases/phase1";
import { phase2 } from "./phases/phase2";
import { phase3 } from "./phases/phase3";
import { phase4 } from "./phases/phase4";
import { phase5 } from "./phases/phase5";
import { phase6 } from "./phases/phase6";
import { phase7 } from "./phases/phase7";

export const curriculum: Module[] = [
  ...phase0,
  ...phase1,
  ...phase2,
  ...phase3,
  ...phase4,
  ...phase5,
  ...phase6,
  ...phase7,
];
