import { IPropertyBase } from "./IPropertyBase";

export class Property implements IPropertyBase {
  id!: number;
  sellRent?: number;
  name!: string ;
  propertyType!: string;
  bhk!: number;
  furnishingType!: string;
  price?: number;
  builtArea!: number;
  carpetArea?: number;
  address!: string;
  address2?: string;
  city!: string;
  floorNo?: string;
  totalFloors?: string;
  readyToMove!: boolean;
  age?: string;
  mainEntrance?: string;
  security?: number;
  gated?: number;
  maintenance?: string;
  estPossessionOn!: string;
  image?:string;
  description?: string;
  postedOn!:string;
  postedBy!:number;

}
