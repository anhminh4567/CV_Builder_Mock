export interface BaseComponent {
  componentName: BaseComponentName;
}
export type BaseComponentName =
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
