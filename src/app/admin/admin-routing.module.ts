import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminPlansComponent } from './admin-plans/admin-plans.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'home', component: AdminHomeComponent },
      { path: 'plans', component: AdminPlansComponent},
      { path: 'user', component: AdminUserComponent},
      
      //{ path: '', redirectTo: 'home', pathMatch: 'full' }
    ],canActivate:[AuthGuard]
    
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
