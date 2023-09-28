import { Component, OnDestroy, OnInit} from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Answers } from '../models/answers';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { Topics } from '../models/topics';
import { StoreService } from '../shared/storeservice.service';
import { TypeQuestion } from '../models/typeQuestion';
import { TypeQuestion2 } from '../models/typeQuestion2';

@Component({
  selector: 'app-multi-upd',
  templateUrl: './multi-upd.component.html',
  styleUrls: ['./multi-upd.component.css']
})
export class MultiUpdComponent implements OnInit, OnDestroy {

  answersTopics: string[] = [];
  answers!: string[];
  answersFront: string = "";
  topics!: string[];
  topics2!: Topics[];
  selected: boolean = false;
  selectedTopics: boolean = false;
  answers2: Answers[] = [];
  objetosAnswersReordenados!: Answers[];
  unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private storeService: StoreService,
    private router: Router
  ) 
  {}

  ngOnInit() {
    this.getAnswers();
    this.getTopics();
    this.getTypeQuestion();
    this.getTypeQuestion2();
  }

  getAnswers() {
    this.apiService.getAnswers()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: Answers[]) => {
        this.answers2 = res;
        for(let i = 0; i < this.answers2.length; i++) {
          this.answersTopics.push(this.answers2[i]?.answer) 
        }
      }
    })
  }

  getTypeQuestion() {
    this.apiService.getTypeQuestion()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: TypeQuestion[]) => {
        for(let i = 0; i < res.length; i++) {
          res[i].typeQuestion.answers.forEach((el: any) => {
            this.answersTopics.push(el.answer);
          })
        }
      }
    })
  }

  getTypeQuestion2() {
    this.apiService.getTypeQuestion2()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: TypeQuestion2[]) => {
        for(let i = 1; i < res.length; i++) {
          res[i].typeQuestion.topics.forEach((el: any) => {
            this.answersTopics.push(el.topic);
          })
        }
      }
    })
  }

  getTopics() {
    this.apiService.getTopics()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: Topics[]) => {
        this.topics2 = res;
        for(let i = 0; i < this.topics2.length; i++) {
          this.answersTopics.push(this.topics2[i]?.topic) 
        }
      }
    })
  }

  juntar(): string {
    return this.answersTopics.join('\n');
  }
  
  updateAnswers() {
    this.answers = this.answersFront.split('\n');
    this.apiService.getTypeQuestion().subscribe({
      next: (res: TypeQuestion[]) => {
        res.forEach((el: any) => {
          console.log(el.id)
          if(el.typeQuestion.question === 'Qual é o seu sexo?') {
            this.apiService.editTypeQuestion({id: 1, typeQuestion: {typeQuestion: 'RU', question: 'Qual é o seu sexo?', answers: [ {id: 1, answer: this.answers[0], selected: this.selected}, {id: 2, answer: this.answers[1], selected: this.selected}]}}).subscribe()
          }
        });
      }
    })
    for(let i = 0; i < this.answers2.length; i++) {
      this.apiService.editAnswers({id: this.answers2[i].id, answer: this.answers[i], selected: this.selected}).subscribe();
    }
    this.apiService.getTypeQuestion2().subscribe({
      next: (res: TypeQuestion2[]) => {
        res.forEach((el: any) => {
          console.log(el.id)
          if(res[1].typeQuestion.question === 'Você comeria essas frutas, sim, não ou talvez?') {
            this.apiService.editTypeQuestion2({id: 1, typeQuestion: {typeQuestion: 'Grid', question: 'Você comeria essas frutas, sim, não ou talvez?', answers: [ {id: 1, answer: this.answers[0], selected: this.selected}, {id: 2, answer: this.answers[1], selected: this.selected},
            {id: 3, answer: this.answers[2], selected: this.selected}]}}).subscribe()
          } 
        });
      }
    })
    this.storeService.setRouterAnswer(true);
    this.storeService.setRuBool(true);
    window.location.reload();
    this.closeComponent();
    
  }

  updateTopics() {
    this.topics = this.answersFront.split('\n');
    for(let i = 0; i < this.topics2.length; i++) {
      this.apiService.editTopics({id: this.topics2[i].id, topic: this.topics[i], selectedTopics: this.selectedTopics}).subscribe();
    }
    this.apiService.getTypeQuestion2().subscribe({
      next: (res: TypeQuestion2[]) => {
        res.forEach((el: any) => {
          console.log(el.id)
          if(res[1].typeQuestion.question === 'Você comeria essas frutas, sim, não ou talvez?') {
            this.apiService.editTypeQuestion2({id: 1, typeQuestion: {typeQuestion: 'Grid', question: 'Você comeria essas frutas, sim, não ou talvez?', topics: [{id: 1, topic: this.topics[0], selectedTopics: this.selectedTopics}, {id: 2, topic: this.topics[1], selectedTopics: this.selectedTopics}, {id: 3, topic: this.topics[2], selectedTopics: this.selectedTopics}]}}).subscribe({
              next: (res: TypeQuestion) => {
                window.location.reload()
              }
          })
          }
            
        });
      }
    })

    this.storeService.setRouterAnswer(true);
    this.storeService.setRuBool(true);
    window.location.reload();
    this.closeComponent();
    
  }

  closeComponent() {
    this.dialog.ngOnDestroy()
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
  }

}
