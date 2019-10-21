import { Component, OnInit } from '@angular/core';
import { RequestsService } from './../../services/requests.service';
import { Perfil } from './../../models/genealModels.model';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {
  p: number = 0;
  allPerfil: Perfil[] = [];
  modalContent: Perfil;
  imagens: any = [];
  constructor(private request: RequestsService) {}

  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.request.getAll().subscribe(
      (data: Perfil[]) => {
        this.allPerfil = data;
        console.log(data);
      },
      error => {}
    );
  }
  verModal(content: Perfil) {
    this.modalContent = content;
    const matches = content.fotoAvatar.split('https');
    // console.log('REGEX', matches);
    this.imagens = matches;
  }
}
