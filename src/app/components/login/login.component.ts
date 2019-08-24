import { RequestsService } from './../../services/requests.service';
import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Login } from 'src/app/models/genealModels.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginJson = new Login();
  idUser: number;
  user: any;
  errorLogin: boolean;
  successLogin: boolean;
  constructor(private service: RequestsService) {}

  ngOnInit() {
    this.successLogin = false;
    this.errorLogin = false;
  }
  login() {
    this.service.login(this.loginJson).subscribe(
      (data: any) => {
        this.successLogin = true;
        const token = data.token;
        const decoded = jwt_decode(token);
        this.idUser = decoded.uid;
        // console.log(this.idUser);
        this.service.obterCadastro(this.idUser).subscribe((user: any) => {
          this.user = user;
          console.log('Usuario que logou', this.user);
        });
      },
      error => {
        this.errorLogin = true;
        this.successLogin = false;
        console.log(error);
      }
    );
  }
}
