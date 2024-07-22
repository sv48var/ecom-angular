import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private get httpOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.getToken()}`,
      }),
    };
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    throw error;
  }

  get(endpoint: string, params: any = {}): Observable<any> {
    return this.http
      .get(`${this.BASE_URL}${endpoint}`, { ...this.httpOptions, params })
      .pipe(
        tap((response) => console.log(response)),
        catchError(this.handleError)
      );
  }

  post(endpoint: string, data: any): Observable<any> {
    return this.http
      .post(`${this.BASE_URL}${endpoint}`, data, this.httpOptions)
      .pipe(
        tap((response) => console.log(response)),
        catchError(this.handleError)
      );
  }

  put(endpoint: string, data: any): Observable<any> {
    return this.http
      .put(`${this.BASE_URL}${endpoint}`, data, this.httpOptions)
      .pipe(
        tap((response) => console.log(response)),
        catchError(this.handleError)
      );
  }

  delete(endpoint: string): Observable<any> {
    return this.http
      .delete(`${this.BASE_URL}${endpoint}`, this.httpOptions)
      .pipe(
        tap((response) => console.log(response)),
        catchError(this.handleError)
      );
  }
}
