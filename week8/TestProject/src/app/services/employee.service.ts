import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  username: string;
  role: string;
  created_on: string;
}
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employees`);
  }

  getEmployee(username: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/employees/${username}`);
  }

  createEmployee(data: { username: string; password: string; role: string }): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/employees`, data);
  }

  updateEmployee(username: string, data: { password?: string; role?: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/employees/${username}`, data);
  }

  deleteEmployee(username: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/employees/${username}`);
  }
}
