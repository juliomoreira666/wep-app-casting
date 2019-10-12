import { Component, OnInit } from '@angular/core';
import { RequestsService } from './../../services/requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  src = '../../../assets/pdf/Revistas_20_FINALIZADA.pdf';
  all: any;
  imagens: any;
  randomNumber = Math.floor(Math.random() * 10) + 1;
  constructor(private getall: RequestsService) {}

  ngOnInit() {
    // this.getAll();
  }
  getAll() {
    this.getall.getAll().subscribe(
      (data: any) => {
        this.all = data;
      },
      error => {
        console.error(error);
      }
    );
  }
}
