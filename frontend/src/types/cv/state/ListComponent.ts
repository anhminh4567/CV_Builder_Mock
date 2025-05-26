import { Component } from "./Component";
import { ComponentType } from "./ComponentType";
import { ListItemComponent } from "./ListItemComponent";

export class ListComponent extends Component {
  public items: ListItemComponent[] = [];
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
      ComponentType.LIST,
      createdAt,
      updatedAt,
      name,
      description,
      details
    );
  }
}
