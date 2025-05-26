import { BaseComponent } from "./BaseComponent";
import { Certificate } from "./Certificate";

export interface CertificateList extends BaseComponent {
  certificates: Certificate[];
}
