import { BaseComponent } from "./BaseComponent";
import { Experience } from "./Experience";

export interface ExperienceList extends BaseComponent {
  experiences: Experience[];
}
