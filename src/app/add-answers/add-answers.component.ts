import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AnswerModel } from '../models/answer';

@Component({
  selector: 'app-add-answers',
  templateUrl: './add-answers.component.html',
  styleUrls: ['./add-answers.component.css']
})
export class AddAnswersComponent {

  answers1!: any;
  answers2!: any;
  id: any = 1

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    
  }

  //Método para enviar os dados para o servidor
  postAnswers() {
    this.apiService.postAnswers({answer1: this.answers1, answer2: this.answers2}).subscribe();
  }

  //Método para editar os dados do servidor
  editAnswers() {
    this.apiService.editAnswers({id: this.id, answer1: this.answers1, answer2: this.answers2}).subscribe({
      next: (res: any) => console.log(res)
    })
  }
  
}
