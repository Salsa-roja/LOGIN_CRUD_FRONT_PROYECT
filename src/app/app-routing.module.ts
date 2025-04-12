import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactosComponent } from './contactos/contactos.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterAuthComponent } from './register-auth/register-auth.component';
import { ContactosFormComponent } from './contactos-form/contactos-form.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'contactos',
    component: ContactosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register-auth',
    component: RegisterAuthComponent 
  },
  {
    path: 'update/:id',
    component: ContactosFormComponent ,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: ContactosFormComponent ,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
