import { IPropertyBase } from './IPropertyBase';
import { photo } from './photo';

export class Property implements IPropertyBase {
  id!: number;
  sellRent?: number;
  name!: string;
  propertyTypeId!: number;
  propertyType!: string;
  bhk!: number;
  furnishingTypeId!: number;
  furnishingType!: string;
  builtArea!: number;
  price!:number;
  carpetArea?: number;
  address!: string;
  address2?: string;
  cityId!: number;
  city!: string;
  floorNo?: string;
  totalFloors?: string;
  readyToMove!: boolean;
  age?: number;
  mainEntrance?: string;
  security?: number;
  gated?: boolean;
  maintenance?: number;
  estPossessionOn!: string;
  image?: string;
  description?: string;
  postedOn!: string;
  postedBy!: number;
  photos?:photo[];
}
