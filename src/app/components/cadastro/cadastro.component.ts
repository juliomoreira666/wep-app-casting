import { RequestsService } from './../../services/requests.service';
import { Login, Cadastro } from './../../models/genealModels.model';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  cadastroJson = new Cadastro();
  successCadastro: boolean;
  errorCadastro: boolean;
  constructor(
    private service: RequestsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.successCadastro = false;
    this.errorCadastro = false;
  }
  cadastrar() {
    this.spinner.show();
    this.service.cadastro(this.cadastroJson).subscribe(
      (data: any) => {
        setTimeout(() => {
          this.spinner.hide();
        }, 4000);
        this.errorCadastro = false;
        console.log(data);
        this.successCadastro = true;
      },
      error => {
        setTimeout(() => {
          this.spinner.hide();
        }, 4000);
        this.errorCadastro = true;
        console.log(error);
        this.successCadastro = false;
      }
    );
  }
}
