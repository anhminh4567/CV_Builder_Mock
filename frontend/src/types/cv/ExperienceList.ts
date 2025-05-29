import { BaseListSection } from "./BaseListSection";
import { Experience } from "./Experience";

export interface ExperienceList extends BaseListSection<Experience> {}
export function isExperienceList(
  section: BaseListSection<Experience>
): section is ExperienceList {
  return section.componentName === "ExperienceList";
}
export function isExperienceListSection(
  section: BaseListSection<Experience>
): section is ExperienceList {
  return section.componentName === "ExperienceList";
}
