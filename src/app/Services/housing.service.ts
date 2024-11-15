import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { IProperty } from '../Interfaces/IProperty';
import { IpcNetConnectOpts } from 'node:net';

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
        return properties.filter(property=>property.SellRent===sellRent);

    })
  );

}

}
