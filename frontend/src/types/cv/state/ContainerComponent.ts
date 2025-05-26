import { Component } from "./Component";
import { ComponentType } from "./ComponentType";

export class ContainerComponent extends Component {
  public childComponents: Component[] = [];
  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    name?: string,
    description?: string,
    details?: any
  ) {
    super(
      id,
      ComponentType.CONTAINER,
      createdAt,
      updatedAt,
      name,
      description,
      details
    );
  }
}
