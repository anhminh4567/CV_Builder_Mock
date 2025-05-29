import { BaseSection } from "../BaseSection";
// import { AllSections } from "./AllSectionTypes";
import { ComponentType } from "./ComponentType";
export class Component<T extends BaseSection> {
  constructor(
    public id: string,
    public type: ComponentType,
    public createdAt: Date,
    public updatedAt: Date,
    public name?: string,
    public description?: string,
    public details: T = {} as T,
    public page?: number
  ) {}
  public static fromType<T extends BaseSection>(
    component: Component<T>
  ): Component<T> {
    return new Component(
      component.id,
      component.type,
      new Date(component.createdAt),
      new Date(component.updatedAt),
      component.name,
      component.description,
      component.details,
      component.page
    );
  }
  public update(): void {
    this.updatedAt = new Date();
  }
}
