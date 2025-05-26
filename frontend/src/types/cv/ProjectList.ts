import { BaseComponent } from "./BaseComponent";
import { Project } from "./Project";

export interface ProjectList extends BaseComponent {
  projects: Project[];
}
