
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './auth/auth.guard';
import { ServicesComponent } from './services/services.component';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { AddNewCompanyComponent } from './add-new-company/add-new-company.component';
import { ProductComponent } from './product/product.component';
import {AddNewProductComponent} from './add-new-product/add-new-product.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'services', component: ServicesComponent, canActivate: [AuthGuard] },
  { path: 'companies-list', component: CompaniesListComponent, canActivate: [AuthGuard] },
  {path: 'products', component: ProductComponent, canActivate: [AuthGuard]},
  {path: 'addNewProduct', component: AddNewProductComponent, canActivate: [AuthGuard]},

  {path: 'addNewCompany', component: AddNewCompanyComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
