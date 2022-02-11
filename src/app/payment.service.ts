import { Injectable } from '@angular/core';

import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Token } from './token';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private baseURL = 'http://localhost:8080/api/payment_token';

  constructor(private httpClient: HttpClient) {}

  createToken(token: Token): Observable<any> {
    return this.httpClient.post(`${this.baseURL}`, token);
  }
}
