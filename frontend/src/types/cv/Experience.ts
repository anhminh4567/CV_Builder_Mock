import { BaseSection } from "./BaseSection";

// Experience
export interface Experience extends BaseSection {
  job_title?: string;
  company?: string;
  from_date?: string;
  to_date?: string;
  description: string[];
}
