import { BaseSection } from "./BaseSection";

// Certificate
export interface Certificate extends BaseSection {
  name?: string;
  date?: string;
  issuer?: string;
}
