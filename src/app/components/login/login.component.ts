import { RequestsService } from './../../services/requests.service';
import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Login } from 'src/app/models/genealModels.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginJson = new Login();
  idUser: any;
  user: any;
  errorLogin: boolean;
  successLogin: boolean;
  constructor(
    private router: Router,
    private service: RequestsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.successLogin = false;
    this.errorLogin = false;
  }
  login() {
    this.spinner.show();
    this.service.login(this.loginJson).subscribe(
      (data: any) => {
        this.successLogin = true;
        const token = data.token;
        const decoded = jwt_decode(token);
        this.idUser = decoded.uid;
        // console.log(this.idUser);
        this.service.obterCadastro(this.idUser).subscribe((user: any) => {
          this.user = user;
          // console.log('Usuario que logou', this.user);
          setTimeout(() => {
            this.spinner.hide();
            this.service.atualizaPerfilaAtual(this.user);
            this.service.idUser(this.idUser);
            this.router.navigate(['perfil']);
          }, 4000);
        });
      },
      error => {
        setTimeout(() => {
          this.spinner.hide();
        }, 4000);
        this.errorLogin = true;
        this.successLogin = false;
        console.log(error);
      }
    );
  }
}
