import { BaseSection } from "./BaseSection";

// Summary
export interface Summary extends BaseSection {
  summary_list: string[];
}
export function isSummary(section: BaseSection): section is Summary {
  return section.componentName === "Summary";
}
