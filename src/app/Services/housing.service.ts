import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { IProperty } from '../Interfaces/IProperty';
import { Property } from '../Interfaces/property';
import { IPropertyBase } from '../Interfaces/IPropertyBase';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
import { IKeyValueTypes } from '../Interfaces/IKeyValueTypes';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  baseUrl = environment.baseUrl;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  private http = inject(HttpClient);

  getAllCities(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/City/cities`);
  }

  getProperty(id: number): Observable<Property | undefined> {
    return this.http.get<Property>(
      this.baseUrl + '/property/detail/' + id.toString()
    );
  }

  getAllProperties(sellRent?: number): Observable<IProperty[]> {
    return this.http.get<IProperty[]>(
      this.baseUrl + '/property/list/' + sellRent?.toString()
    );
  }

  addProperty(property: Property) {
    // Envuelve la propiedad en un objeto con la clave propertyDto

    return this.http.post<Property>(this.baseUrl + '/property/add', property);
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

  getPropertyAge(dateofEstablishment: string): string {
    const today = new Date();
    //Convierte el string de fecha de establecimiento a un objeto Date
    const estDate = new Date(dateofEstablishment);
    let age = today.getFullYear() - estDate.getFullYear();
    const m = today.getMonth() - estDate.getMonth();

    // Current month smaller than establishment month or
    // Same month but current date smaller than establishment date
    if (m < 0 || (m === 0 && today.getDate() < estDate.getDate())) {
      age--;
    }

    // Establshment date is future date
    if (today < estDate) {
      return '0';
    }

    // Age is less than a year
    if (age === 0) {
      return 'menor a 1 año';
    }

    return age.toString();
  }

  // Nuevo método para obtener tipos de propiedad
  getAllPropertyTypes(): Observable<IKeyValueTypes[]> {
    return this.http.get<IKeyValueTypes[]>(`${this.baseUrl}/PropertyType/list`);
  }

  getAllFurnishingTypes(): Observable<IKeyValueTypes[]> {
    return this.http.get<IKeyValueTypes[]>(
      `${this.baseUrl}/FurnishingType/list`
    );
  }
}
