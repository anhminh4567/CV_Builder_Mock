import { BaseSection } from "./BaseSection";

// CustomSection
export interface CustomSection extends BaseSection {
  name?: string;
  content: string[];
}
