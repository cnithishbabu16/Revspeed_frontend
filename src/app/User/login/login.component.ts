// login.component.ts

import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { User } from '../../User/user';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: User = new User();
  credentials: any = {
    id:this.user.id,
    email: '',
    password: ''
  };
  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (response: any) => {
        console.log("print response:", response.id);
        this.authService.saveUserId(response.id);
        this.authService.saveToken(response.token);
        const role = this.authService.getRoleFromToken();
        
        if (role === 'ROLE_ADMIN') {
          this.router.navigate(['/admin/home']);
        } else if (role === 'ROLE_CUSTOMER') {
          localStorage.setItem('userEmail',this.credentials.email);
          this.router.navigate(['/customer/home']);
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Login failed: ' + (err.error?.message || err.message));
      }
    });
  }
}
