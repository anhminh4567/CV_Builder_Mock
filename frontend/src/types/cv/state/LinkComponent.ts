import { BaseSection } from "../BaseSection";
import { Component } from "./Component";
import { ComponentType } from "./ComponentType";

export class LinkComponent<T extends BaseSection> extends Component<T> {
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
      ComponentType.LINK,
      createdAt,
      updatedAt,
      name,
      description,
      details
    );
  }
}
