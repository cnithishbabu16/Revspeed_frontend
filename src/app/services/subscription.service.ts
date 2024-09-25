import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = 'http://35.222.240.69:8080/api/subscriptions';

  constructor(private http: HttpClient) { }

  subscribeToPlan(subscriptionRequest: { userEmail: string; planId: any; paymentSuccessful: any; }): Observable<any> {
    // const requestBody = { userEmail:userEmail, planId: plan.id };
    
    return this.http.post<any>(`${this.apiUrl}/subscribe`, subscriptionRequest, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    
    }).pipe(
      catchError(this.handleError)  // Catch errors
    );
  }

  getUserSubscriptions(userId:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  cancelSubscription(subscriptionId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/cancel/${subscriptionId}`);
  }
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);  // Log the full error object
    let errorMessage = 'Something went wrong; please try again later.';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
