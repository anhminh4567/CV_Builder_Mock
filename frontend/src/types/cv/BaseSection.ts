export interface BaseSection {
  componentName: BaseSectionName;
}
export type BaseSectionName =
  | "Heading"
  | "Contact"
  | "Summary"
  | "Education"
  | "Experience"
  | "ExperienceList"
  | "CertificateList"
  | "Certificate"
  | "SkillList"
  | "Skill"
  | "ProjectList"
  | "Project"
  | "CustomSection";
