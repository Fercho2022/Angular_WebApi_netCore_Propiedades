import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { IProperty } from '../Interfaces/IProperty';
import { Property } from '../Interfaces/property';
import { IPropertyBase } from '../Interfaces/IPropertyBase';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HousingService {

  baseUrl=environment.baseUrl;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  private http = inject(HttpClient);

  getAllCities():Observable<string[]>{

    return  this.http.get<string[]>(`${this.baseUrl}/City`);


  }

  getProperty(id: number): Observable<Property | undefined>{
    return this.getAllProperties(undefined).pipe(
      map(propertiesArray => {

          const property = propertiesArray.find(p => p.Id === id);
          if (!property) {
              throw new Error('Property not found');
          }
          return property as Property;
      })
  );
}

  getAllProperties(sellRent?: number): Observable<IProperty[]> {
    return this.http.get<IProperty[]>('assets/data/properties.json').pipe(
      map((properties) => {
        // Obtener propiedades del localStorage
        const localProps = this.getAllLocalProperties();
        // Combinar propiedades del JSON y localStorage
        const allProperties = [...properties, ...localProps];

        if (sellRent === undefined) {
          return allProperties;
        }
        return allProperties.filter(
          (property) => property.VentaAlquiler === sellRent
        );
      })
    );
  }

  addProperty(property: Property) {
    if (isPlatformBrowser(this.platformId)) {
      let properties: Property[] = [];

      // Obtener propiedades existentes
      const existingPropertiesString = localStorage.getItem('properties');
      if (existingPropertiesString) {
        properties = JSON.parse(existingPropertiesString);
      }
      //Agregar la nueva propiedad al array
      properties.push(property);

      //El método JSON.stringify(property) convierte el objeto properties a una
      //  cadena de texto en formato JSON. Esto es necesario porque
      // localStorage solo puede almacenar cadenas de texto.
      localStorage.setItem('properties', JSON.stringify(properties));
    }
  }

  getAllLocalProperties(): IProperty[] {
    if (isPlatformBrowser(this.platformId)) {
      const propertiesString = localStorage.getItem('properties');
      if (propertiesString) {
        return JSON.parse(propertiesString);
      }
    }
    return [];
  }

  newPropId(): number {
    if (isPlatformBrowser(this.platformId)) {
      let currentId = localStorage.getItem('PID');

      if (currentId) {
        // Convertir a número, incrementar y volver a string
        const nextId = Number(currentId) + 1;
        localStorage.setItem('PID', nextId.toString());
        return nextId;
      } else {
        localStorage.setItem('PID', '101');
        return 101;
      }
    }
    return 101; // Valor por defecto cuando no estamos en el navegador
  }
}
