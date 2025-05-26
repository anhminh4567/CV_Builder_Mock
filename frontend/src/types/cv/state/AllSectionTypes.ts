import { Certificate } from "../Certificate";
import { CertificateList } from "../CertificateList";
import { Contact } from "../Contact";
import { CustomSection } from "../CustomSection";
import { Education } from "../Education";
import { Experience } from "../Experience";
import { ExperienceList } from "../ExperienceList";
import { Heading } from "../Heading";
import { Project } from "../Project";
import { ProjectList } from "../ProjectList";
import { Skill } from "../Skill";
import { SkillList } from "../SkillList";
import { Summary } from "../Summary";

export type SectionLists =
  | CertificateList
  | SkillList
  | ExperienceList
  | ProjectList;

export type SectionListItem = Certificate | Skill | Experience | Project;
export type Sections = Education | Heading | Contact | Summary | CustomSection;
export type AllSections = SectionLists | SectionListItem | Sections;
export const sectionListsNames = [
  "CertificateList",
  "SkillList",
  "ExperienceList",
  "ProjectList",
];
export const sectionListItemNames = [
  "Certificate",
  "Skill",
  "Experience",
  "Project",
];
export const sectionsNames = [
  "Education",
  "Heading",
  "Contact",
  "Summary",
  "CustomSection",
];
