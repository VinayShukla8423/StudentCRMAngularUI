
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  userName: string;
  email: string;
  roleId: string;
  roleName: string;
  isActive: boolean;
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
}

export interface UpdateUserRequest {
  userName: string;
  email: string;
  isActive: boolean;
}

export interface ChangeUserRoleRequest {
  roleId: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5228/api/users';
  private rolesUrl = 'http://localhost:5228/api/roles';

  private getHeaders(): HttpHeaders {
    // Apne AuthService mein use hone wali actual token key check karein.
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      'Content-Type': 'application/json'
    });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.rolesUrl, {headers: this.getHeaders()});
  }

  updateUser(id: string, request: UpdateUserRequest): Observable<string> {
    return this.http.put( `${this.apiUrl}/${id}`,
      request,
      {
        headers: this.getHeaders(),
        responseType: 'text'
      }
    );
  }

  changeRole(
    id: string,
    request: ChangeUserRoleRequest
  ): Observable<string> {
    return this.http.put(
      `${this.apiUrl}/${id}/role`,
      request,
      {
        headers: this.getHeaders(),
        responseType: 'text'
      }
    );
  }

  deleteUser(id: string): Observable<string> {
    return this.http.delete(
      `${this.apiUrl}/${id}`,
      {
        headers: this.getHeaders(),
        responseType: 'text'
      }
    );
  }
}
