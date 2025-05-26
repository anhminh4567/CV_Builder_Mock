import { BaseSection } from "./BaseSection";

// Project
export interface Project extends BaseSection {
  name?: string;
  description: string[];
  link?: string;
}
