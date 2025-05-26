import { BaseComponent } from "./BaseComponent";

// Experience
export interface Experience extends BaseComponent {
  job_title?: string;
  company?: string;
  from_date?: string;
  to_date?: string;
  description: string[];
}
