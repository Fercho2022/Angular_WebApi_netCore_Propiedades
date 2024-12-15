import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { IProperty } from '../Interfaces/IProperty';
import { Property } from '../Interfaces/property';


@Injectable({
  providedIn: 'root'

})

export class HousingService {


  private http = inject(HttpClient);

  getAllProperties(sellRent?: number):Observable<IProperty[]> {
    return this.http.get<IProperty[]>("assets/data/properties.json")
    .pipe(
      map(properties=>{
        if(sellRent===undefined) {
          return properties;
        }
        return properties.filter(property=>property.VentaAlquiler===sellRent);

    })
  );

}

addProperty(property:Property){
  //El método JSON.stringify(property) convierte el objeto property a una
  //  cadena de texto en formato JSON. Esto es necesario porque
  // localStorage solo puede almacenar cadenas de texto.
  localStorage.setItem('newProp', JSON.stringify(property));
}

}
