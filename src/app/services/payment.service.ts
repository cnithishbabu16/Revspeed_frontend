import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://35.222.240.69:8080/api/payment';

  constructor(private http: HttpClient) { }

  processPayment(paymentData: { token: string, amount: number, currency: string, description: string }): Observable<any> {
    const headers= new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
  return this.http.post<any>(`${this.apiUrl}/charge`,  paymentData,{ headers })
  .pipe(
    map(response => {
      if (response.status === 'success') {
          // Handle successful payment
      } else {
          // Handle failed payment
          console.error('Payment failed:', response.message);
      }
      return response;
  }),
    catchError(err => {
        console.error('Payment Error:', err);
        return throwError(err);
    })
);
      
  }
}
