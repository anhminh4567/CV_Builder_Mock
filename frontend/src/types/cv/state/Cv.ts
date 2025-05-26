import { Component } from "./Component";

export class Cv {
  public static readonly DEFAULT_A4_RATIO = 297 / 210;
  public static readonly DEFAULT_A4_HEIGHT = 297 * 5; //( 5px);
  public id: string;
  public name: string;
  public description: string;
  public createdAt?: string;
  public width: number;
  public height: number;
  public Components: Component[];
  get ratio(): number {
    return this.width / this.height;
  }
  constructor(
    name: string,
    description: string,
    width?: number,
    height?: number,
    createdAt?: string,
    component?: Component[]
  ) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.description = description;
    this.height = height ?? Cv.DEFAULT_A4_HEIGHT;
    this.width = width ?? Cv.DEFAULT_A4_HEIGHT / Cv.DEFAULT_A4_RATIO;
    this.createdAt = createdAt;
    this.Components = component ?? [];
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
  public addComponent(index: number, newComponent: Component): void {
    let firstSectoin = this.Components.slice(0, index);
    let secondSection = this.Components.slice(index);
    this.Components = [...firstSectoin, newComponent, ...secondSection];
  }
  public removeComponent(index: number): void {
    this.Components = this.Components.filter((_, i) => i !== index);
  }
  public moveComponentToPosition(
    componentIndex: number,
    newPosition: number
  ): void {
    if (componentIndex < 0 || componentIndex >= this.Components.length) {
      throw new Error("Component index out of bounds");
    }
    if (newPosition < 0 || newPosition >= this.Components.length) {
      throw new Error("New position out of bounds");
    }
    const component = this.Components[componentIndex];
    this.removeComponent(componentIndex);
    this.addComponent(newPosition, component);
  }
}
