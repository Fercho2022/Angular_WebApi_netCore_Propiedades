import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Resolver } from 'dns';
import { Property } from '../Interfaces/property';
import { catchError, EMPTY, Observable } from 'rxjs';
import { HousingService } from './housing.service';
import { IProperty } from '../Interfaces/IProperty';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<Property | undefined>{

constructor(
  private _housingService:HousingService,
  private router: Router
) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Property | undefined>  {
    const propId=Number(route.params['id']);
    return this._housingService.getProperty(propId).pipe(
      catchError((error) => {
        this.router.navigate(['/']);
        return EMPTY;
      }
    ));
  }

}
