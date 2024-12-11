export interface IPropertyBase{
  Id?:number | null;
 VentaAlquiler?: number | null;
  Name:string;
  PType:string;
  FType:string;
  Price?:number | null;
  BHK: number | null;
  BuiltArea: number | null;
  City: string;
  RTM:string;

  Image?:string;
}
