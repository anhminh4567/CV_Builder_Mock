import { BaseComponent } from "./BaseComponent";
import { Skill } from "./Skill";

export interface SkillList extends BaseComponent {
  skills: Skill[];
}
