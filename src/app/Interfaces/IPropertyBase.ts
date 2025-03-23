export interface IPropertyBase {
  id?: number | null;
  sellRent?: number | null;
  name: string;
  propertyType: string;
  furnishingType: string;
  price?: number | null;
  bhk: number | null;
  builtArea: number | null;
  carpetArea?: number | null;
  security?: number | null;
  maintenance?: number | null;
  city: string;
  readyToMove: boolean | null;
  estPossessionOn: string;
  image?: string;
}
