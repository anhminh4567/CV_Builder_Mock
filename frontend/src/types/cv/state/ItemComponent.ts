import { Component } from "./Component";
import { ComponentType } from "./ComponentType";

export class ItemComponent extends Component {
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
      ComponentType.ITEM,
      createdAt,
      updatedAt,
      name,
      description,
      details
    );
  }
}
