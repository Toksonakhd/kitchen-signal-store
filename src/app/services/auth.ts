
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface LoginResponse {
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'https://srmsapi.stepacademy.ge/api/v1';

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/auth/login`,
      { email, password }
    );
  }
}
