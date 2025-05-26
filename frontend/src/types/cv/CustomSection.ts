import { BaseComponent } from "./BaseComponent";

// CustomSection
export interface CustomSection extends BaseComponent {
  name?: string;
  content: string[];
}
