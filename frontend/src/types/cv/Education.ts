import { BaseSection } from "./BaseSection";

// Education
export interface Education extends BaseSection {
  institution?: string;
  degree?: string;
  gpa?: number;
  date?: string;
  major?: string;
}
export function isEducation(section: BaseSection): boolean {
  return section.componentName === "Education";
}
