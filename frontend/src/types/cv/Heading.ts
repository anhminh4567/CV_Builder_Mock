import { BaseSection } from "./BaseSection";

// Heading
export interface Heading extends BaseSection {
  fullname: string;
  introduction?: string;
}
export function isHeading(section: BaseSection): boolean {
  return section.componentName === "Heading";
}
