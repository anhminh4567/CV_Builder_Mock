import { BaseSection } from "../BaseSection";
import { Component } from "./Component";
import { CvSettings, CvSettingsDefault } from "./CvSettings";

export class Cv {
  public static readonly DEFAULT_A4_RATIO = 297 / 210;
  public static readonly DEFAULT_A4_HEIGHT = 297 * 5; //( 5px);
  public id: string;
  public name: string;
  public description: string;
  public createdAt?: string;
  public width: number;
  public height: number;
  public Components: Component<BaseSection>[];
  public cvSettings?: CvSettings;
  get ratio(): number {
    return this.width / this.height;
  }
  get componentIds(): string[] {
    return this.Components.map((c) => c.id);
  }
  constructor(
    name: string,
    description: string,
    width?: number,
    height?: number,
    createdAt?: string,
    component?: Component<BaseSection>[],
    cvSettings?: CvSettings
  ) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.description = description;
    this.height = height ?? Cv.DEFAULT_A4_HEIGHT;
    this.width = width ?? Cv.DEFAULT_A4_HEIGHT / Cv.DEFAULT_A4_RATIO;
    this.createdAt = createdAt;
    this.Components = component ?? [];
    this.cvSettings = cvSettings ?? CvSettingsDefault;
  }
  public static fromType(cv: Cv): Cv {
    let newCv = new Cv(
      cv.name,
      cv.description,
      cv.width,
      cv.height,
      cv.createdAt,
      cv.Components
    );
    newCv.id = cv.id;
    return newCv;
  }

  public saveToLocalStorage(key: string = "cv_data"): void {
    const json = JSON.stringify(this);
    //key + "_" + this.id
    localStorage.setItem(key, json);
  }

  public static loadFromLocalStorage(key: string = "cv_data"): Cv | null {
    const json = localStorage.getItem(key);
    if (!json) return null;
    const obj = JSON.parse(json);
    return Cv.fromType(obj);
  }
  public static addComponent<T extends BaseSection>(
    input: Cv,
    index: number,
    newComponent: Component<T>
  ): void {
    let firstSectoin = input.Components.slice(0, index);
    let secondSection = input.Components.slice(index);
    input.Components = [...firstSectoin, newComponent, ...secondSection];
  }
  public static removeComponent(input: Cv, index: number): void {
    input.Components = input.Components.filter((_, i) => i !== index);
  }
  public static moveComponentToPosition(
    input: Cv,
    componentIndex: number,
    newPosition: number
  ): void {
    if (componentIndex < 0 || componentIndex >= input.Components.length) {
      throw new Error("Component index out of bounds");
    }
    if (newPosition < 0 || newPosition >= input.Components.length) {
      throw new Error("New position out of bounds");
    }
    const component = input.Components[componentIndex];
    Cv.removeComponent(input, componentIndex);
    Cv.addComponent(input, newPosition, component);
  }
}
