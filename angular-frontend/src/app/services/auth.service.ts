import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  register(user: User) {
    return this.http.post(`${this.apiUrl}/Auth/register`, user, {
      responseType: 'text',
    });
  }

  login(user: User) {
    return this.http.post(`${this.apiUrl}/Auth/login`, user, {
      responseType: 'text',
    });
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('authToken');

    console.log(
      `${this.jwtHelper.isTokenExpired(
        token
      )} !this.jwtHelper.isTokenExpired(token);`
    );

    console.log('!!token ' + !!token);

    console.log(
      `!!token && !this.jwtHelper.isTokenExpired(token) ${
        !!token && this.jwtHelper.isTokenExpired(token)
      }`
    );
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  signout() {
    sessionStorage.removeItem('authToken');
  }
}
