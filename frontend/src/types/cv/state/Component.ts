import { AllSections } from "./AllSectionTypes";
import { ComponentType } from "./ComponentType";
import { CustomSection } from "../CustomSection";
export class Component {
  constructor(
    public id: string,
    public type: ComponentType,
    public createdAt: Date,
    public updatedAt: Date,
    public name?: string,
    public description?: string,
    public details: AllSections = {} as CustomSection
  ) {}
  public static fromType(component: Component): Component {
    return new Component(
      component.id,
      component.type,
      new Date(component.createdAt),
      new Date(component.updatedAt),
      component.name,
      component.description
    );
  }
  public update(): void {
    this.updatedAt = new Date();
  }
}
