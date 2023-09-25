import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { StoreService } from '../shared/storeservice.service';
import { Router } from '@angular/router';
import { TypeQuestion } from '../models/typeQuestion';
import { Answers } from '../models/answers';

@Component({
  selector: 'app-add-answers',
  templateUrl: './add-answers.component.html',
  styleUrls: ['./add-answers.component.css']
})
export class AddAnswersComponent implements OnInit {

  selected: boolean = false;
  textarea: string = '';
  answers: string[] = [];
  answers2: Answers[] = [];
  question!: string;
  myQuestion: string = "";
  data: TypeQuestion[] = [];

  selectedTopics: boolean = false;
  topics: string[] = [];

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private storeService: StoreService,
    private router: Router
  ) 
  {}

  ngOnInit() { 

    this.apiService.getAnswers().subscribe({
      next: (res: Answers[]) =>  {
        this.answers2 = res,
        console.log(this.answers2)
      }
    });
  }
  
   createAnswers() {
    this.answers = this.textarea.split('\n');
    for(let i = 0; i < this.answers.length; i++) {
      this.apiService.postAnswers({answer: this.answers[i], selected: this.selected}).subscribe();
    }
    
    this.apiService.editTypeQuestion({id: 1, typeQuestion: {typeQuestion: "RU", question: 'Qual é o seu sexo?', answers: [  {id: 1, answer: this.answers[0], selected:  this.selected}, {id: 2, answer: this.answers[1], selected: this.selected}]} }).subscribe();
  
    this.router.navigate(["/answer"])
    this.storeService.setRouterAnswer(true);
    this.storeService.setRuBool2(true);
    this.storeService.setRuBool3(true);
    this.storeService.setRuBool(false);
    window.location.reload();
    this.closeComponent();
  }

  createTopics() {
    this.topics = this.textarea.split('\n');
    for(let i = 0; i < this.topics.length; i++) {
      this.apiService.postTopics({topic: this.topics[i], selectedTopics: this.selectedTopics}).subscribe();
    }
    
    this.apiService.editTypeQuestion2({id: 1, typeQuestion: {typeQuestion: 'Grid', question: this.question, answers: [  {id: 1, answer: this.answers2[0].answer, selected:  this.selected}, {id: 2, answer: this.answers2[1].answer, selected: this.selected},
    {id: 3, answer: this.answers2[2].answer, selected: this.selected}], 
      topics: [{id: 1, topic: this.topics[0], selectedTopics: this.selectedTopics}, {id: 2, topic: this.topics[1], selectedTopics: this.selectedTopics}, {id: 3, topic: this.topics[2], selectedTopics: this.selectedTopics}]} }).subscribe();

    
    this.storeService.setRouterAnswer(true);
    this.router.navigate(["/topics"]);
    this.closeComponent();
  }

  closeComponent() {
    this.dialog.ngOnDestroy()
  }

}
