import { BaseListSection } from "./BaseListSection";
import { Project } from "./Project";

export interface ProjectList extends BaseListSection<Project> {}
export function isProjectList(
  section: BaseListSection<Project>
): section is ProjectList {
  return section.componentName === "ProjectList";
}
