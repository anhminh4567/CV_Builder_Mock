import { BaseListSection } from "./BaseListSection";
import { Skill } from "./Skill";

export interface SkillList extends BaseListSection<Skill> {}
export function isSkillList(
  section: BaseListSection<Skill>
): section is SkillList {
  return section.componentName === "SkillList";
}
