import { Sections } from "./AllSectionTypes";
import { Component } from "./Component";
import { ComponentType } from "./ComponentType";

export class ItemComponent<T extends Sections> extends Component<T> {
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
