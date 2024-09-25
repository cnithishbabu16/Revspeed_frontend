import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plan } from './plans';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private apiUrl = 'http://35.222.240.69:8080/api';

  constructor(private http: HttpClient) {}

  getPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.apiUrl}/admin/plans`);
  }
  getPlanById(planId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/plans/${planId}`);
  }

  createPlan(plan: Plan): Observable<Plan> {
    return this.http.post<Plan>(`${this.apiUrl}/admin/plan`, plan);
  }

  updatePlan(plan: Plan): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/admin/plan/${plan.id}`, plan);
  }

  deletePlan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/plan/${id}`);
  }
}
