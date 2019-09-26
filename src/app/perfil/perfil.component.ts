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
  image: string;
  idUser: any;
  perfilStorage = new Perfil();
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
  changeListener($event): void {
    this.readThis($event.target);
  }
  readThis(inputValue: any): void {
    let file: File = inputValue.files[0];
    let myReader: FileReader = new FileReader();
    myReader.onloadend = e => {
      const base64Data = myReader.result;
      const base64string = base64Data.toString();
      const base64result = base64string.split(',')[1];
      this.image = base64result;
      console.log('Imagem upload', base64result);
      this.uploadImg(this.image);
    };
    myReader.readAsDataURL(file);
  }
  uploadImg(b64: string) {
    this.serviceComp.uploadImg(b64).subscribe(
      data => {
        console.log('IMAGEM', data);
      },
      error => {
        console.log(error);
      }
    );
  }
  attCadastro(): void {
    console.log('TESTE', this.perfilStorage);
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
}
