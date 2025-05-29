import { BaseListSection } from "./BaseListSection";
import { Certificate } from "./Certificate";

export interface CertificateList extends BaseListSection<Certificate> {}
export function isCertificateList(
  section: BaseListSection<Certificate>
): section is CertificateList {
  return section.componentName === "CertificateList";
}
