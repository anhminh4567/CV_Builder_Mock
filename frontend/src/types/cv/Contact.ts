import { BaseSection } from "./BaseSection";

// Contact
export interface Contact extends BaseSection {
  email?: string;
  phone?: string;
  address?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}
