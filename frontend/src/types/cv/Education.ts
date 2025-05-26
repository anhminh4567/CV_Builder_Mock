import { BaseSection } from "./BaseSection";

// Education
export interface Education extends BaseSection {
  institution?: string;
  degree?: string;
  gpa?: number;
  date?: string;
  major?: string;
}
