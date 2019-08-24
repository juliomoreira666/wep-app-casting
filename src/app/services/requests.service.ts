import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/genealModels.model';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  constructor(private http: HttpClient) {}
  /**
   * Login
   */
  login(login: Login): Observable<any> {
    const body = new HttpParams()
      .set('email', login.email)
      .set('password', login.password);
    return this.http.post(
      'http://127.0.0.1:3333/api/v1/login',
      body.toString(),
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        )
      }
    );
  }
  public cadastro(body: any): Observable<any> {
    return this.http.post('http://127.0.0.1:3333/api/v1/registrar', body);
  }
  public obterCadastro(id: number) {
    return this.http.get(`http://127.0.0.1:3333/api/v1/user/${id}`);
  }
}
