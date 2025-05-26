import { BaseComponent } from "./BaseComponent";

// Project
export interface Project extends BaseComponent {
  name?: string;
  description: string[];
  link?: string;
}
