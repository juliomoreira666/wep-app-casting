import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Login } from '../models/genealModels.model';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  public perfil: any;
  public perfilVO = new BehaviorSubject(this.perfil);
  public currentPerfil = this.perfilVO.asObservable();
  public id: any;
  public idVo = new BehaviorSubject(this.id);
  public currentId = this.idVo.asObservable();

  constructor(private http: HttpClient) {}
  public atualizaPerfilaAtual(perfil: any) {
    this.perfilVO.next(perfil);
  }
  public idUser(id: any) {
    const idUserLocal = localStorage.getItem('champId');
    if (idUserLocal === undefined || idUserLocal === null) {
      localStorage.setItem('champId', btoa(id));
      if (idUserLocal !== undefined || idUserLocal !== null) {
        console.log('Console log local', idUserLocal);
      }
    } else if (idUserLocal !== undefined || idUserLocal !== null) {
      localStorage.removeItem('champId');
      localStorage.setItem('champId', btoa(id));
    }
    // this.idVo.next(d);
  }
  /**
   * Login
   */
  login(login: Login): Observable<any> {
    const body = new HttpParams()
      .set('email', login.email)
      .set('password', login.password);
    return this.http.post(
      `${environment.API_URL}/api/v1/login`,
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
    return this.http.post(`${environment.API_URL}/api/v1/registrar`, body);
  }
  public obterCadastro(id?: number) {
    return this.http.get(`${environment.API_URL}/api/v1/user/${id}`);
  }
  uploadImg(base64: string): Observable<any> {
    let headers = new HttpHeaders();
    // headers = headers.append('Authorization', 'Client-ID ' + 'eeb1c5919e02c00');
    headers = headers.append(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    headers = headers.append('Access-Control-Allow-Origin', '*');
    const body = new HttpParams().set('image', base64);
    return this.http.post(
      `https://api.imgbb.com/1/upload?key=${'71e640dcf068ff0cdba57ddb8670945e'}`,
      body.toString(),
      {
        headers
      }
    );
  }
}
