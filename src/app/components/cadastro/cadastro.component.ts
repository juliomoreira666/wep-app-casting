import { RequestsService } from './../../services/requests.service';
import { Login, Cadastro } from './../../models/genealModels.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  cadastroJson = new Cadastro();
  successCadastro: boolean;
  errorCadastro: boolean;
  constructor(private service: RequestsService) {}

  ngOnInit() {
    this.successCadastro = false;
    this.errorCadastro = false;
  }
  cadastrar() {
    this.service.cadastro(this.cadastroJson).subscribe(
      (data: any) => {
        this.errorCadastro = false;
        console.log(data);
        this.successCadastro = true;
      },
      error => {
        this.errorCadastro = true;
        console.log(error);
        this.successCadastro = false;
      }
    );
  }
}
