import { Perfil } from './../models/genealModels.model';
import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../services/requests.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfil: Perfil;
  loadContent: boolean;
  idUser: any;
  perfilStorage = new Perfil();
  image: File;
  resData: any;
  selectedFile = null;
  fileData: File = null;
  imagens: any = [];
  constructor(
    private router: Router,
    private http: HttpClient,
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
    // console.log('ID DO MANO', id);
    this.serviceComp.obterCadastro(this.idUser).subscribe(
      (perfil: any) => {
        this.spinner.show();
        this.perfil = perfil;
        this.loadContent = true;
        // console.log(this.perfil);
        const matches = this.perfil.fotoAvatar.split('https');
        // console.log('REGEX', matches);
        this.imagens = matches;
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
  attCadastro(): void {
    // console.log('TESTE', this.perfilStorage);
    this.serviceComp
      .atualizarCadastro(this.perfilStorage, this.idUser)
      .subscribe(
        (data: any) => {
          this.populaPerfilVo();
          console.log(data);
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  inputFileChange(event) {
    this.spinner.show();
    if (event.target.files && event.target.files[0]) {
      const foto = event.target.files[0];
      const formData = new FormData();
      formData.append('avatar', foto);
      this.spinner.show();
      this.http
        .post('https://upload.ngrok.io/upload-avatar', formData)
        .subscribe(
          (data: any) => {
            const urlApi = 'https://upload.ngrok.io/';
            // console.log(data);
            const dataFoto = `${urlApi}${data.data.name}`;
            // console.log('Data foto', dataFoto);
            const adicionaFoto = this.perfil.fotoAvatar + dataFoto;
            this.perfil.fotoAvatar = adicionaFoto;
            const newCad = new Perfil();
            setTimeout(() => {
              this.spinner.hide();
            }, 4000);
            newCad.fotoAvatar = adicionaFoto;
            this.serviceComp.atualizarCadastro(newCad, this.idUser).subscribe(
              (date: any) => {
                setTimeout(() => {
                  this.spinner.hide();
                }, 4000);
                // console.log('ATUALIZAção de foto', date);
                this.populaPerfilVo();
              },
              error => {
                setTimeout(() => {
                  this.spinner.hide();
                }, 4000);
                console.error(error);
              }
            );
          },
          (error: any) => {
            setTimeout(() => {
              this.spinner.hide();
            }, 4000);
            console.error(error);
          }
        );
    }
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
