import { BaseSection } from "./BaseSection";

export interface BaseListSection<TChildItem extends BaseSection>
  extends BaseSection {
  items: TChildItem[];
}
