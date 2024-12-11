import { IPropertyBase } from "./IPropertyBase";

export class Property implements IPropertyBase {
  Id?: number;
  VentaAlquiler?: number;
  Name!: string ;
  PType!: string;
  BHK!: number;
  FType!: string;
  Price?: number;
  BuiltArea!: number;
  CarpetArea?: number;
  Address!: string;
  Address2?: string;
  City!: string;
  FloorNo?: string;
  TotalFloors?: string;
  RTM!: string;
  AOP?: string;
  MainEntrance?: string;
  Security?: number;
  Gated?: number;
  Maintenance?: string;
  Possession?: string;
  Image?:string;
  Description?: string;
  PostedOn!:string;
  PostedBy!:number;

}
