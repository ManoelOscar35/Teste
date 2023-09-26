import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { StoreService } from '../shared/storeservice.service';
import { Router } from '@angular/router';
import { TypeQuestion } from '../models/typeQuestion';
import { Answers } from '../models/answers';
import { TypeQuestion2 } from '../models/typeQuestion2';
import { Topics } from '../models/topics';

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
      this.apiService.postAnswers({answer: this.answers[i], selected: this.selected}).subscribe({
        next: (res: Answers) => this.storeService.setRuBool(true)
      });
    }
    
    this.apiService.editTypeQuestion({id: 1, typeQuestion: {typeQuestion: "RU", question: 'Qual é o seu sexo?', answers: [  {id: 1, answer: this.answers[0], selected:  this.selected}, {id: 2, answer: this.answers[1], selected: this.selected}]} }).subscribe({
      next: (res: TypeQuestion) => this.storeService.setRuBool(true)
    });
  
    this.router.navigate(["/answer"])
    this.storeService.setRouterAnswer(true);
    this.storeService.setRuBool2(true);
    this.storeService.setRuBool3(true);
    window.location.reload();
    this.closeComponent();
  }

  createTopics() {
    this.topics = this.textarea.split('\n');
    for(let i = 0; i < this.topics.length; i++) {
      this.apiService.postTopics({topic: this.topics[i], selectedTopics: this.selectedTopics}).subscribe({
        next: (res: Topics) => this.storeService.setRuBool(false)
      });
    }
    
    this.apiService.editTypeQuestion2({id: 1, typeQuestion: {typeQuestion: 'Grid', question: "Você comeria essas frutas, sim, não ou talvez", answers: [  {id: 1, answer: this.answers2[0].answer, selected:  this.selected}, {id: 2, answer: this.answers2[1].answer, selected: this.selected},
    {id: 3, answer: this.answers2[2].answer, selected: this.selected}], 
      topics: [{id: 1, topic: this.topics[0], selectedTopics: this.selectedTopics}, {id: 2, topic: this.topics[1], selectedTopics: this.selectedTopics}, {id: 3, topic: this.topics[2], selectedTopics: this.selectedTopics}]} }).subscribe({
        next: (res: TypeQuestion2) => this.storeService.setRuBool(false)
      });

    
    this.storeService.setRouterAnswer(true);
    this.router.navigate(["/topics"]);
    window.location.reload();
    this.closeComponent();
  }

  closeComponent() {
    this.dialog.ngOnDestroy()
  }

}
