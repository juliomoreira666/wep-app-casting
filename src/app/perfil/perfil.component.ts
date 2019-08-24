import { Perfil } from './../models/genealModels.model';
import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../services/requests.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfil: Perfil;
  loadContent: boolean;
  idUser: any;
  perfilStorage: any;
  constructor(
    private serviceComp: RequestsService,
    private spinner: NgxSpinnerService
  ) {
    this.populaPerfilVo();
  }
  ngOnInit() {
    this.loadContent = false;
  }
  populaPerfilVo() {
    const id = localStorage.getItem('champId');
    this.loadContent = false;
    this.spinner.show();
    this.idUser = atob(id);
    console.log('ID DO MANO', id);
    this.serviceComp.obterCadastro(this.idUser).subscribe(
      (perfil: any) => {
        this.spinner.show();
        this.perfil = perfil;
        this.loadContent = true;
        console.log(this.perfil);
        if (perfil !== undefined && perfil !== null) {
          setTimeout(() => {
            this.spinner.hide();
          }, 4000);
        }
      },
      error => {
        setTimeout(() => {
          this.spinner.hide();
        }, 4000);
      }
    );
  }
}
