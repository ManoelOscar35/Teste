import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StoreService } from '../shared/storeservice.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  answer1!: string;
  answer2!: string;
  index!: string;
  select!: any;

  constructor(
    private apiService: ApiService,
    private storeService: StoreService
  )
  {}

  ngOnInit() {
    //Obtendo os dados do servidor
    this.apiService.getAnswers().subscribe({
      next: (res: any) => {
        console.log(res)
        this.answer1 = res[0].answer1,
        this.answer2 = res[0].answer2,
        this.index = res[0].id
      }
    })

    this.select = document.getElementById('type-answers');

    //Obtendo valor do select
    this.select.addEventListener('change', () =>{
      this.storeService.setTypeAnswers(this.select.value);
    })
  }

  //Excluindo as respostas
  delete() {
    this.apiService.deleteAnswers(1).subscribe({
      next: () => window.location.reload()
    });
  }

  



 
}
