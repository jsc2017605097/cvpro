import type { ProfilePreset } from "@/types/preset";

import devIntern from "./dev-intern.json";
import devJunior from "./dev-junior.json";
import devMidSenior from "./dev-mid-senior.json";
import devFullstack from "./dev-fullstack.json";
import devFrontend from "./dev-frontend.json";
import devBackend from "./dev-backend.json";
import devDevops from "./dev-devops.json";
import qaEngineer from "./qa-engineer.json";
import baJunior from "./ba-junior.json";
import baSenior from "./ba-senior.json";
import pmMid from "./pm-mid.json";
import pmSenior from "./pm-senior.json";
import poScrum from "./po-scrum.json";
import marketingDigital from "./marketing-digital.json";
import salesB2b from "./sales-b2b.json";
import accountant from "./accountant.json";
import hrRecruiter from "./hr-recruiter.json";
import careerSwitcher from "./career-switcher.json";
import englishTech from "./english-tech.json";

export const PRESETS: ProfilePreset[] = [
  devIntern,
  devJunior,
  devMidSenior,
  devFullstack,
  devFrontend,
  devBackend,
  devDevops,
  qaEngineer,
  baJunior,
  baSenior,
  pmMid,
  pmSenior,
  poScrum,
  marketingDigital,
  salesB2b,
  accountant,
  hrRecruiter,
  careerSwitcher,
  englishTech,
] as ProfilePreset[];

export function getPresetById(id: string): ProfilePreset | undefined {
  return PRESETS.find((p) => p.id === id);
}
