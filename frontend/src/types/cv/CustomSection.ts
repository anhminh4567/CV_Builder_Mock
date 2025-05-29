import { BaseSection } from "./BaseSection";

// CustomSection
export interface CustomSection extends BaseSection {
  name?: string;
  content: string[];
}
export function isCustomSection(section: BaseSection): boolean {
  return section.componentName === "CustomSection";
}
