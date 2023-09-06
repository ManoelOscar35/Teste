import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StoreService } from '../shared/storeservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  singleChoice: string = "";
  answer1!: string;
  answer2!: string;
  index: any;
  question!: string;
  typeAnswers!: string;

  radio: string = "radio";
  selecionar: string = "selecionar";
  caixa: string = "caixa";
  links: string = "links";
  normal: string = "normal";
  
  constructor(
    private apiService: ApiService,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    //Obtendo os dados do servidor
    this.apiService.getAnswers().subscribe({
      next: (res: any) => {
        this.answer1 = res[0].answer1,
        this.answer2 = res[0].answer2,
        this.index = res[0].id
      }
    })

    //Obtendo os dados do servidor
    this.apiService.getQuestion().subscribe({
      next: (res: any) => {
        this.question = res[0].question
      }
    })

    //Obter dado do Observable
    this.storeService.getTypeAnswers().subscribe({
      next: (res: any) => {
        this.typeAnswers = res,
        console.log(this.typeAnswers)
      }
    });
  }

  //Atribuir valor ao singleChoice
  sc() {
    this.singleChoice = "RU";
  }


}
