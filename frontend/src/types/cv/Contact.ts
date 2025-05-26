import { BaseComponent } from "./BaseComponent";

// Contact
export interface Contact extends BaseComponent {
  email?: string;
  phone?: string;
  address?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}
