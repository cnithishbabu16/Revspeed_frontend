import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {  CustomerRoutingModule } from './customer-routing.module';
import { ViewPlansComponent } from './view-plans/view-plans.component';
import { PlanDetailsDialogComponent } from './plan-details-dialog/plan-details-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule, MatOptionSelectionChange } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DurationFormatPipe } from './duration-format.pipe';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { ActiveSubscriptionsComponent } from './active-subscriptions/active-subscriptions.component';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    ViewPlansComponent,
    PlanDetailsDialogComponent,
    DurationFormatPipe,
    ProfileComponent,
    SubscriptionsComponent,
    ActiveSubscriptionsComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
     MatDialogActions,
     MatDialogContent,
    MatOptionModule,
    FormsModule,
    MatListModule
    
  ]
})
export class CustomerModule { }
