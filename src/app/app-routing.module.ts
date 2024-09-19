import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './User/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './User/register/register.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirect to home if path is empty
  {path: 'login', component: LoginComponent },
  {path : 'register',component:RegisterComponent},
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    
   },
   {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
    canActivate: [AuthGuard],
    
   },
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
