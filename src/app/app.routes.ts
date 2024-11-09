import { Routes } from '@angular/router';
import { AddPropertyComponent } from './Components/add-property/add-property.component';
import { ListCardComponent } from './Components/list-card/list-card.component';
import { PropertyDetailComponent } from './Components/property-detail/property-detail.component';

export const routes: Routes = [
  {path: '', component: ListCardComponent },
  {path: 'add-property', component: AddPropertyComponent},
  {path: 'rent-property', component: ListCardComponent },
  {path: 'property-detail/:id', component: PropertyDetailComponent },
  {path: '**', component: ListCardComponent },
];
