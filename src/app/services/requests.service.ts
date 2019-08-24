import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Login } from '../models/genealModels.model';
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
  public obterCadastro(id?: number) {
    return this.http.get(`http://127.0.0.1:3333/api/v1/user/${id}`);
  }
}
