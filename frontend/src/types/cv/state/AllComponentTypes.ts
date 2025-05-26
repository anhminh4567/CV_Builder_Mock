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

type SectionLists = CertificateList | SkillList | ExperienceList | ProjectList;
type Sections =
  | Education
  | Heading
  | Experience
  | Certificate
  | Skill
  | Project
  | Contact
  | Summary
  | CustomSection;
export type AllComponentTypes = SectionLists | Sections;
