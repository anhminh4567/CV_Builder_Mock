import { SectionListItem } from "./AllSectionTypes";
import { Component } from "./Component";
import { ComponentType } from "./ComponentType";

export class ListItemComponent<T extends SectionListItem> extends Component<T> {
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
