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
    this.width = width ?? Cv.DEFAULT_A4_HEIGHT * Cv.DEFAULT_A4_RATIO;
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
}
