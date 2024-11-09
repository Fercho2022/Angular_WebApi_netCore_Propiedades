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

  getAllProperties():Observable<IProperty[]> {

    return this.http.get<{[key: string]: IProperty}>("assets/data/properties.json").pipe(
      map(data => {
        console.log(data);
        const propertyArray: Array<IProperty> = [];
        for (const id in data) {
          if (data.hasOwnProperty(id)) {
            propertyArray.push(data[id]);

          }
        }
        return propertyArray;
      }))


    }


}
