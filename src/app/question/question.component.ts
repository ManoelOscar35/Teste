import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  question!: string;
  id: any = 1;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    
  }

  //Método para enviar a question pro servidor
  questionMethod() {
    this.apiService.postQuestion({question: this.question}).subscribe({
      next: (res: any) => window.location.reload()
    })
  }

  //Método para editar a question
  edit() {
    this.apiService.editQuestion({id: this.id, question: this.question}).subscribe({
      next: (res: any) => window.location.reload()
    })
  }

  //Método para excluir a question
  delete() {
    this.apiService.deleteQuestion(1).subscribe({
      next: (res: any) => window.location.reload()
    })
  }
}
