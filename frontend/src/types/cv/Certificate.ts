import { BaseComponent } from "./BaseComponent";

// Certificate
export interface Certificate extends BaseComponent {
  name?: string;
  date?: string;
  issuer?: string;
}
