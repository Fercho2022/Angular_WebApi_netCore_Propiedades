import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { IProperty } from '../Interfaces/IProperty';


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

}
