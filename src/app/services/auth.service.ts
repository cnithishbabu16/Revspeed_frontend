// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../User/user';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080';
 

  constructor(private http: HttpClient,private router: Router,) { }

  register(user: any): Observable<User> {
    return this.http.post<any>(`${this.baseUrl}/api/auth/register`, user, {
      headers: {
        'Content-Type':'application/json'
      }
    });
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/auth/login`, user);
  }

  saveUserId(id:any){
    console.log("setting userId");
    localStorage.setItem('userId',id);
  }
  // getUserId():string|null{
  //   return localStorage.getItem('userId');
  // }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // getRoleFromToken(): string | null {
  //   const token = this.getToken();
  //   if (token) {
  //     const payload = JSON.parse(atob(token.split('.')[1]));
  //     return payload.role; // Assuming 'role' is stored in the token payload
  //   }
  //   return null;
  // }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }
  
  getRoleFromToken(): string | null {
    const token = this.getToken();
    
    if (token) {
      console.log('Token:', token); 
      const parts = token.split('.');
      console.log('Token Parts:', parts);
      if (parts.length === 3) { 
        const base64Url = parts[1]; 
        if (base64Url) { 
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL-safe characters
          try {
            const jsonPayload = atob(base64);
            const payload = JSON.parse(jsonPayload);
            return payload.role; 
          } catch (error) {
            console.error('Error decoding token payload', error);
            return null;
          }
        } else {
          console.error('Invalid token format: No payload part found');
          return null;
        }
      } else {
        console.error('Invalid token format: Token does not have three parts');
        return null;
      }
    } else {
      console.error('Token is null or undefined');
      return null;
    }
  }

  getUserId(): number{
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : 0;
  }

  getUserEmail(): string {
    return localStorage.getItem('userEmail') || '';
  }

  

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
