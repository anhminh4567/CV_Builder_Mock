import { SectionListItem, SectionLists } from "./AllSectionTypes";
import { Component } from "./Component";
import { ComponentType } from "./ComponentType";
import { ListItemComponent } from "./ListItemComponent";

export class ListComponent<
  T extends SectionListItem,
  TParent extends SectionLists
> extends Component<T> {
  public items: ListItemComponent<TParent>[] = [];
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
