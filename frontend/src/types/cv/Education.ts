import { BaseComponent } from "./BaseComponent";

// Education
export interface Education extends BaseComponent {
  institution?: string;
  degree?: string;
  gpa?: number;
  date?: string;
  major?: string;
}
