import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './User/login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { RegisterComponent } from './User/register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AppComponent
  ],
  imports: [
    
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AdminModule,
    CustomerModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatOptionModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
