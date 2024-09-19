import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../User/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  

  private apiUrl = 'http://localhost:8080/api';
  
  // Initialize BehaviorSubject with an empty array
   private usersSubject = new BehaviorSubject<User[]>([]);
  // users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admin/customers`);
  }

  deleteUser(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/admin/customer/${id}`, { responseType: 'text' }).pipe(
      tap(() => {
        // Successfully deleted, update the users list
        const updatedUsers = this.usersSubject.value.filter(user => user.id !== id);
        this.usersSubject.next(updatedUsers);
      })
    );
      
    
  }

  deleteUserProfile(email:string):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/customer/delete/${email}`);
  }
  // updateUser(user:User):Observable<any>{
  //   return this.http.put<any>(`${this.apiUrl}/user/${EmailValidator}`,user);
  // }

  // getUserByEmail():Observable<User[]>{
  //   return this.http.get<User[]>(`${this.apiUrl}/user/${user.email}`)
  // }
  getUserProfile(email:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${email}`);
  }

  updateUserProfile(profileData: any,email:string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/user/${email}`, profileData);
  }

}  
