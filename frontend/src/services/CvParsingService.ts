import { BaseSection } from "@/types/cv/BaseSection";
import { AllSections } from "@/types/cv/state/AllSectionTypes";
import { Heading } from "@/types/cv/Heading";
import { Contact } from "@/types/cv/Contact";
import { Summary } from "@/types/cv/Summary";
import { Education } from "@/types/cv/Education";
import { Experience } from "@/types/cv/Experience";
import { ExperienceList } from "@/types/cv/ExperienceList";
import { CertificateList } from "@/types/cv/CertificateList";
import { Certificate } from "@/types/cv/Certificate";
import { SkillList } from "@/types/cv/SkillList";
import { Skill } from "@/types/cv/Skill";
import { ProjectList } from "@/types/cv/ProjectList";
import { Project } from "@/types/cv/Project";
import { CustomSection } from "@/types/cv/CustomSection";
import { ComponentType } from "@/types/cv/state/ComponentType";
import { ListComponent } from "@/types/cv/state/ListComponent";
import { ListItemComponent } from "@/types/cv/state/ListItemComponent";
import { ItemComponent } from "@/types/cv/state/ItemComponent";
import { LinkComponent } from "@/types/cv/state/LinkComponent";
import { Component } from "@/types/cv/state/Component";
import {
  sectionListsNames,
  sectionListItemNames,
  sectionsNames,
} from "@/types/cv/state/AllSectionTypes";
import { BaseListSection } from "@/types/cv/BaseListSection";

function parseSection(section: BaseSection): AllSections | null {
  switch (section.componentName) {
    case "Heading":
      return {
        componentName: "Heading",
        fullname: (section as any).fullname ?? undefined,
        introduction: (section as any).introduction ?? undefined,
      } as Heading;
    case "Contact":
      return {
        componentName: "Contact",
        email: (section as any).email ?? undefined,
        phone: (section as any).phone ?? undefined,
        address: (section as any).address ?? undefined,
        linkedin: (section as any).linkedin ?? undefined,
        github: (section as any).github ?? undefined,
        website: (section as any).website ?? undefined,
      } as Contact;
    case "Summary":
      return {
        componentName: "Summary",
        summary_list: (section as any).summary_list ?? [],
      } as Summary;
    case "Education":
      return {
        componentName: "Education",
        institution: (section as any).institution ?? undefined,
        degree: (section as any).degree ?? undefined,
        gpa: (section as any).gpa ?? 0,
        date: (section as any).date ?? undefined,
        major: (section as any).major ?? undefined,
      } as Education;
    case "Experience":
      return {
        componentName: "Experience",
        job_title: (section as any).job_title ?? undefined,
        company: (section as any).company ?? undefined,
        from_date: (section as any).from_date ?? undefined,
        to_date: (section as any).to_date ?? undefined,
        description: (section as any).description ?? [],
      } as Experience;
    case "ExperienceList":
      return {
        componentName: "ExperienceList",
        items: (section as any).experiences ?? [],
      } as ExperienceList;
    case "CertificateList":
      return {
        componentName: "CertificateList",
        items: (section as any).certificates ?? [],
      } as CertificateList;
    case "Certificate":
      return {
        componentName: "Certificate",
        name: (section as any).name ?? undefined,
        date: (section as any).date ?? undefined,
        issuer: (section as any).issuer ?? undefined,
      } as Certificate;
    case "SkillList":
      return {
        componentName: "SkillList",
        items: (section as any).skills ?? [],
      } as SkillList;
    case "Skill":
      return {
        componentName: "Skill",
        skill_type: (section as any).skill_type ?? undefined,
        name: (section as any).name ?? undefined,
      } as Skill;
    case "ProjectList":
      return {
        componentName: "ProjectList",
        items: (section as any).projects ?? [],
      } as ProjectList;
    case "Project":
      return {
        componentName: "Project",
        name: (section as any).name ?? undefined,
        description: (section as any).description ?? [],
        link: (section as any).link ?? undefined,
      } as Project;
    case "CustomSection":
      return {
        componentName: "CustomSection",
        name: (section as any).name ?? undefined,
        content: (section as any).content ?? [],
      } as CustomSection;
    default:
      return null;
  }
}
function parseSectionType(section: BaseSection): ComponentType | null {
  const name = section.componentName;
  if (sectionListsNames.includes(name)) {
    return ComponentType.LIST;
  }
  if (sectionListItemNames.includes(name)) {
    return ComponentType.LIST_ITEM;
  }
  if (sectionsNames.includes(name)) {
    return ComponentType.ITEM;
  }
  return null;
}

function parseComponent(section: AllSections): Component | null {
  const type = parseSectionType(section);
  const id = crypto.randomUUID();
  const now = new Date();
  let component: Component | null = null;
  switch (type) {
    case ComponentType.LIST:
      component = new ListComponent(
        id,
        now,
        now,
        section.componentName,
        undefined,
        section
      ) as ListComponent;
      const listComponent = component as ListComponent;
      const items = (section as BaseListSection<BaseSection>).items;
      if (Array.isArray(items) && items.length > 0) {
        items.forEach((item) => {
          const itemComponent = parseComponent(item);
          if (itemComponent) {
            listComponent.items.push(itemComponent);
          }
        });
      }
      break;
    case ComponentType.LIST_ITEM:
      component = new ListItemComponent(
        id,
        now,
        now,
        section.componentName,
        undefined,
        section
      );
      break;
    case ComponentType.ITEM:
      component = new ItemComponent(
        id,
        now,
        now,
        section.componentName,
        undefined,
        section
      );
      break;
    case ComponentType.LINK:
      component = new LinkComponent(
        id,
        now,
        now,
        section.componentName,
        undefined,
        section
      );
      break;
    default:
      component = null;
  }
  if (hasChildComponents(section)) {
  }
  return component;
}
function hasChildComponents(section: BaseSection): boolean {
  switch (section.componentName) {
    case "CertificateList":
      return (
        Array.isArray((section as any).certificates) &&
        (section as any).certificates.length > 0
      );
    case "SkillList":
      return (
        Array.isArray((section as any).skills) &&
        (section as any).skills.length > 0
      );
    case "ExperienceList":
      return (
        Array.isArray((section as any).experiences) &&
        (section as any).experiences.length > 0
      );
    case "ProjectList":
      return (
        Array.isArray((section as any).projects) &&
        (section as any).projects.length > 0
      );
    default:
      return false;
  }
}
export { parseComponent, parseSection, parseSectionType };
