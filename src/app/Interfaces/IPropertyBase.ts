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
<<<<<<< HEAD
  RTM:string;
=======
  RTM:boolean | null;
  PossesionOn:string ;
>>>>>>> de46aa05b03a90b16a02e067c2b1f7c63000b85b
  Image?:string;
}
