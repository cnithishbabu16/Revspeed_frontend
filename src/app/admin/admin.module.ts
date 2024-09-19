import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminPlansComponent } from './admin-plans/admin-plans.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
//import { AdminCreateplanComponent } from './admin-createplan/admin-createplan.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPseudoCheckbox, MatPseudoCheckboxModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminPlansComponent,
    AdminUserComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPseudoCheckboxModule
  ]
})
export class AdminModule { }
