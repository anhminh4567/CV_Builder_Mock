import { Component } from "./Component";
import { ComponentType } from "./ComponentType";

export class ListItemComponent extends Component {
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
      ComponentType.LIST_ITEM,
      createdAt,
      updatedAt,
      name,
      description,
      details
    );
  }
}
