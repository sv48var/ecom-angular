import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { URLs } from '../constants/endPointURLs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments/environments';

interface ApiResponse {
  user: any;
  token: string;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$: Observable<any> = this.userSubject.asObservable();

  constructor(private apiService: ApiService, private http:HttpClient) {
    const storedUser = localStorage.getItem('userDetails');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }
  private BASE_URL = environment.apiUrl;

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    throw error;
  }

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post(`${this.BASE_URL}ecom/login/`, loginData).pipe(
      tap((response: any) => {  
        const typedResponse = response as ApiResponse;  
        this.userSubject.next(typedResponse.user);
        const token = typedResponse.token;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userDetails', JSON.stringify(typedResponse.user));
      }),
      catchError(this.handleError)
    );
  }
  

  googleLogin(googleToken: string): Observable<any> {
    return this.apiService.post('login', { google_token: googleToken }).pipe(
      tap((response: ApiResponse) => {
        this.userSubject.next(response.user);
        const token = response.token;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userDetails', JSON.stringify(response.user));
      }),
      catchError(this.handleError)
    );
  }

  signup(username: string, email: string, password: string): Observable<any> {
    const signupData = { username, email, password };
    console.log('Signup Data:', signupData);
  
    return this.http.post(`${this.BASE_URL}ecom/signup/`, signupData).pipe(
      tap((response) => {
        console.log('Signup Response:', response);
      }),
      catchError(this.handleError)
    );
  }
  
   

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUserName(): string | null {
    return localStorage.getItem('userDetails');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userDetails');
    this.userSubject.next(null);
    
  }

  getUserDetails(): any {
    return this.userSubject.value;
  }
}
