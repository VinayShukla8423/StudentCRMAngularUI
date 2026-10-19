
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginResponse {
  message: string;
  userId: string;
  userName: string;
  email: string;
  roleId: string;
  role: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
  private apiUrl = 'http://localhost:5228/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    debugger;
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      { email, password }
    ).pipe(
      tap(response => {
        debugger;
        localStorage.setItem('token', response.token);
        localStorage.setItem('userName', response.userName);
        localStorage.setItem('role', response.role);
      })
    );
  }
}
