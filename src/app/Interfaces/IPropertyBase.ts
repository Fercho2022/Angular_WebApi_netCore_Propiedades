import { NgTemplateOutlet } from '@angular/common';

export interface IPropertyBase {
  id?: number | null;
  sellRent?: number | null | string; // Cambiar a union de tipos
  name: string;
  propertyType: string; // Asegúrate de que sea un string
  furnishingType: string; // Asegúrate de que sea un string
  price: number | null;
  bhk: number | null;
  builtArea: number | null;
  carpetArea?: number | null;
  security?: number | null;
  maintenance?: number | null;
  city: string;
  readyToMove: boolean | null;
  estPossessionOn: string;
  age?: number | null;
  photo?: string;
  image?: string;
}
