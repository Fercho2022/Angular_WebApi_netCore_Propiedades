import { Routes } from '@angular/router';
import { AddPropertyComponent } from './Components/add-property/add-property.component';
import { ListCardComponent } from './Components/list-card/list-card.component';
import { PropertyDetailComponent } from './Components/property-detail/property-detail.component';
import { UserLoginComponent } from './Components/user/user-login/user-login.component';
import { UserRegisterComponent } from './Components/user/user-register/user-register.component';
import { PropertyDetailResolverService } from './Services/property-detail-resolver.service';
import { ForgotPasswordComponent } from './Components/user/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Components/user/reset-password/reset-password.component';

export const routes: Routes = [
  { path: '', component: ListCardComponent },
  { path: 'add-property', component: AddPropertyComponent },
  { path: 'rent-property', component: ListCardComponent },

  //El resolve: { property: PropertyDetailResolverService } significa que:
  //El resolver PropertyDetailResolverService devolverá un valor
  //Este valor se almacenará en data con la clave 'property'
  {
    path: 'property-detail/:id',
    component: PropertyDetailComponent,
    resolve: { property: PropertyDetailResolverService },
  },
  { path: 'user/login', component: UserLoginComponent },
  { path: 'user/register', component: UserRegisterComponent },
  { path: 'user/forgot-password', component: ForgotPasswordComponent },
  { path: 'user/reset-password', component: ResetPasswordComponent },
  { path: '**', component: ListCardComponent },
];
