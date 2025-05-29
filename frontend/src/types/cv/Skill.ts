import { BaseSection } from "./BaseSection";

// Skill
export interface Skill extends BaseSection {
  skill_type?: string;
  name?: string;
}
export function isSkill(section: BaseSection): boolean {
  return section.componentName === "Skill";
}
