import { ComponentType } from "./ComponentType";

export class Component {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public type: ComponentType,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
  public static fromType(component: Component): Component {
    return new Component(
      component.id,
      component.name,
      component.description,
      component.type,
      new Date(component.createdAt),
      new Date(component.updatedAt)
    );
  }
  public update(): void {
    this.updatedAt = new Date();
  }
}
