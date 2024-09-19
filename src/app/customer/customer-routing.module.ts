import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from '../guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { ViewPlansComponent } from './view-plans/view-plans.component';
import { PlanDetailsDialogComponent } from './plan-details-dialog/plan-details-dialog.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { ProfileComponent } from './profile/profile.component';
import { ActiveSubscriptionsComponent } from './active-subscriptions/active-subscriptions.component';

const routes: Routes = [
    {
      path: 'customer',
      component: LayoutComponent,
      children: [
        { path: 'home', component: HomeComponent },
        { path: 'view-plans', component: ViewPlansComponent},
        //{path: 'plan-details', component:PlanDetailsDialogComponent},
        {path: 'subscriptions/:id',component: SubscriptionsComponent},
        // { path: 'user', component: AdminUserComponent},
        {path:'profile',component:ProfileComponent},
        {path:'active-subscriptions',component:ActiveSubscriptionsComponent}
        //{ path: '', redirectTo: 'home', pathMatch: 'full' }
      ],canActivate:[AuthGuard]
      
    }
  
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CustomerRoutingModule { }